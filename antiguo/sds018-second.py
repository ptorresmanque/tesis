import os
import sys
import time
import serial
import numpy as np
import matplotlib.pyplot as plt

# Reopen sys.stdout with buffer size 0 (unbuffered)
sys.stdout = os.fdopen(sys.stdout.fileno(), 'w', 0)

# Set default USB port
USBPORT = "COM7"


class SDS021Reader:

    def __init__(self, inport):
        self.serial = serial.Serial(port=inport, baudrate=9600)

    def readValue( self ):
        step = 0
        while True: 
            while self.serial.inWaiting() != 0:
                v = ord(self.serial.read())
                

                if step == 0:
                    if v == 170:
                        step = 1

                elif step == 1:
                    if v == 192:
                        values = [0,0,0,0,0,0,0]
                        step = 2
                    else:
                        step = 0

                elif step > 8:
                    step = 0
                    # Compute PM2.5 and PM10 values
                    pm25 = (values[1]*256 + values[0])/10.0
                    pm10 = (values[3]*256 + values[2])/10.0
                    #print values
                    return [pm25,pm10]

                elif step >= 2:
                    values[step - 2] = v
                    step = step + 1


    def read( self ):
        species = [[],[]]

        while 1:
            try:
                values = self.readValue()
                species[0].append(values[0])
                species[1].append(values[1])
                print("loop: {}, PM2.5: {}, PM10: {}, StdDev(PM2.5):{:3.1f}".format(len(species[0]), values[0], values[1], np.std(species[0])))
                #time.sleep(1)  # wait for one second
                if(len(species[0]) >= 300):
                    
                    Y = species[0]
                    X = species[1]

                    plt.plot(Y)
                    plt.show()

                    plt.plot(X)
                    plt.show()
                    species = [[],[]]

            except KeyboardInterrupt:
                print("Quit!")
                sys.exit()
            except:
                e = sys.exc_info()[0]
                print("Can not read sensor data! Error description: " + str(e))

def loop(usbport):
    print("Starting reading dust sensor on port " + usbport + "...") 
    reader = SDS021Reader(usbport) 
    while 1:
        reader.read()


loop(USBPORT)