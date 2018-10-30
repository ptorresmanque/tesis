#include <SoftwareSerial.h>
// GPS Setup
#define rxGPS 3
#define txGPS 5
SoftwareSerial serialGPS = SoftwareSerial(rxGPS, txGPS);
String stringGPS = "";

void setup() {
  pinMode(rxGPS, INPUT);
  pinMode(txGPS, OUTPUT);


  Serial.begin(9600);
  Serial.println("Started");

  // GPS Setup
  serialGPS.begin(9600);
  digitalWrite(txGPS,HIGH);

  // Cut first gibberish
  while(serialGPS.available())
    if (serialGPS.read() == '\r')
    {
      Serial.println("se encontro");
      break;  
    }
}

void loop()
{
  String s = checkGPS();
  Serial.println(s);
}

// Check GPS and returns string if full line recorded, else false
String checkGPS()
{
  if (serialGPS.available())
  {
    char c = serialGPS.read();
    stringGPS  = c;
    return stringGPS;
    
  }
}
