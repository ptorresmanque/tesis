import serial as Se, time as ti

MySer = Se.Serial()
MySer.port = 'COM8'
MySer.baudrate = 9600
MySer.open()

nFH = open('gps.txt', 'w')

while 1:
    sLine = MySer.readline()
    sLine = sLine[:-2] + '\n'
    print(sLine)
    nFH.write(sLine)
nFH.close()
MySer.close()