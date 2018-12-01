#include <ESP8266HTTPClient.h>

#include "DHT.h" 
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include "RestClient.h"


#define IP "http://95b1f751.ngrok.io" // Server IP
#define PORT 3678     // Server Port
#define DHTTYPE DHT11   // DHT 11
#define dht_dpin 2
DHT dht(dht_dpin, DHTTYPE);

const char* ssid     = "PTORRES";
const char* password = "manquepillan";

WiFiClient client;
const char* host="http://jsonplaceholder.typicode.com/";
String PostData = "Temperatura=0Humedad=0PM10=0PM25=0Lat=1Long=1";

int cero = 0;
String response;

void setup() {
  // put your setup code here, to run once:
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


 
  dht.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  HTTPClient http;
  http.begin("http://95b1f751.ngrok.io/api/saveMuestra");
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  http.POST("Temperatura="+String(t)+"&Humedad="+String(h)+"&PM10=0&PM25=0&Lat=2&Long=2");
  http.writeToStream(&Serial);
  http.end();

  delay(5000);
  
}
