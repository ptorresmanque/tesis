#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>
#include <ESP8266HTTPClient.h>
#include "DHT.h" 


#define DHTTYPE DHT11   // DHT 11
#define dht_dpin D5
DHT dht(dht_dpin, DHTTYPE);


const char* ssid     = "PTORRES";
const char* password = "manquepillan";
int incomingByte = 0;
int paso = 0;
int values[7];
float pm10;
float pm25;
int cero = 0;
int initTime = millis();

SoftwareSerial smp(D3, D4); //Rx, Tx

void setup() {
  Serial.begin(115200);
  smp.begin(9600);
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

  dht.begin();
}


void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature(); 
  
  if (smp.available() > 0) {
    // read the incoming byte:
    incomingByte = smp.read();
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
      Serial.print("Humedad:   ");
      Serial.println(h);
      Serial.print("Temperatura:   ");
      Serial.println(t);

      
      
    }else if(paso >= 2){
      values[paso - 2] = incomingByte;
      paso = paso + 1;
    }
  }

  if((millis() - initTime)> 86400){
    HTTPClient http;
    http.begin("http://138.68.45.13:5000/saveMuestra");
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    http.POST("Temperatura="+String(t)+"&Humedad="+String(h)+"&PM10="+String(pm10)+"&PM25="+String(pm25)+"&Lat=2&Long=2");
    http.writeToStream(&Serial);
    http.end();
    initTime = millis();    
    } 
}

