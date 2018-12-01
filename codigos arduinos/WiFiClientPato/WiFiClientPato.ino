#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include "RestClient.h"


#define IP "http://95b1f751.ngrok.io" // Server IP
#define PORT 3678     // Server Port

const char* ssid     = "PTORRES";
const char* password = "manquepillan";
int incomingByte = 0;
int paso = 0;
int values[7];
float pm10;
float pm25;
int cero = 0;

RestClient client = RestClient(IP, PORT);

void setup() {
  Serial.begin(9600);
  delay(10);

  // We start by connecting to a WiFi network

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  client.dhcp();
}

int value = 0;
String response;

void loop() {
  
  if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = Serial.read();
    if(paso == 0 ){
      if(incomingByte == 170){
        paso = 1;
      }
    }else if(paso == 1){
      if(incomingByte == 192){
        paso = 2;
      }else{
        paso = 0;
      }
    }else if(paso > 8){
      paso = 0;
      pm25 = (values[1]*256 + values[0])/10.0;
      pm10 = (values[3]*256 + values[2])/10.0;
      Serial.print("pm25:   ");
      Serial.println(pm25);
      Serial.print("pm10:   ");
      Serial.println(pm10);

      response = "";
      client.setHeader("Content-Type: application/x-www-form-urlencoded");
      StaticJsonBuffer<200> jsonBuffer;
      char json[256];
      JsonObject& root = jsonBuffer.createObject();
      root["Temperatura"] = cero;
      root["Humedad"] = cero;
      root["PM10"] = pm10;
      root["PM25"] = pm25;
      root["Lat"] = cero;
      root["Long"] = cero;
      root.printTo(json, sizeof(json));
      Serial.println(json);
      int statusCode = client.post("/api/saveMuestra", json, &response);
      Serial.print("Status code from server: ");
      Serial.println(statusCode);
      Serial.print("Response body from server: ");
      Serial.println(response);
      
    }else if(paso >= 2){
      values[paso - 2] = incomingByte;
      paso = paso + 1;
    }

    

    //Serial.print("I received: ");
    //Serial.println(incomingByte, DEC);
  }   
}

