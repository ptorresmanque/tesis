#include <AsyncTaskLib.h>
#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>
#include <ESP8266HTTPClient.h>
#include "DHT.h"
#include <TinyGPS++.h> 


#define DHTTYPE DHT11   // DHT 11
#define dht_dpin D5
DHT dht(dht_dpin, DHTTYPE);

static const int RXPin = D6, TXPin = D7;

TinyGPSPlus gps;


const char* ssid     = "PTORRES";
const char* password = "manquepillan";
int incomingByte = 0;
int paso = 0;
int values[7];
float pm10;
float pm25;
float t;
float h;
String latitud;
String longitud;
int initTime = millis();

SoftwareSerial smp(D3, D4); //Rx, Tx
SoftwareSerial ss(RXPin, TXPin);

AsyncTask Post(86400, true, []() { 
  HTTPClient http;
  http.begin("http://138.68.45.13:5000/saveMuestra");
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  http.POST("Temperatura="+String(t)+"&Humedad="+String(h)+"&PM10="+String(pm10)+"&PM25="+String(pm25)+"&Lat="+latitud+"&Long="+longitud);
  http.writeToStream(&Serial);
  http.end();
  Serial.println("");
  initTime = millis(); 
});

void setup() {
  Serial.begin(115200);
  smp.begin(9600);
  ss.begin(9600);
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
  Post.Start();
}


void loop() {
  h = dht.readHumidity();
  delayMicroseconds(10);
  t = dht.readTemperature();
  delayMicroseconds(10);

  if(ss.available() > 0){
    if (gps.encode(ss.read()))
      displayInfo();
  }
   
  
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
      Serial.print("Latitud:   ");
      Serial.println(latitud);
      Serial.print("Logitud:   ");
      Serial.println(longitud);

      
      
    }else if(paso >= 2){
      values[paso - 2] = incomingByte;
      paso = paso + 1;
    }
  }
  Post.Update();
  

}

void displayInfo()
{
  Serial.print(F("Location: ")); 
  if (gps.location.isValid())
  {
    latitud = String(gps.location.lat(), 8);
    longitud = String(gps.location.lng(), 8);
    Serial.print(latitud);
    Serial.print(F(","));
    Serial.print(longitud);
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.print(F("  Date/Time: "));
  if (gps.date.isValid())
  {
    Serial.print(gps.date.month());
    Serial.print(F("/"));
    Serial.print(gps.date.day());
    Serial.print(F("/"));
    Serial.print(gps.date.year());
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.print(F(" "));
  if (gps.time.isValid())
  {
    if (gps.time.hour() < 10) Serial.print(F("0"));
    Serial.print(gps.time.hour());
    Serial.print(F(":"));
    if (gps.time.minute() < 10) Serial.print(F("0"));
    Serial.print(gps.time.minute());
    Serial.print(F(":"));
    if (gps.time.second() < 10) Serial.print(F("0"));
    Serial.print(gps.time.second());
    Serial.print(F("."));
    if (gps.time.centisecond() < 10) Serial.print(F("0"));
    Serial.print(gps.time.centisecond());
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.println();
}
