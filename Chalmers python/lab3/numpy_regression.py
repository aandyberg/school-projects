#from matrix import *
from numpy import *
import matplotlib.pyplot as plt
import sys

def powers(list, num1, num2):
    poweredMatrix = [[list[j]**i for i in range(num1,num2+1)] for j in range(len(list))]
    return array(poweredMatrix)

def native_regression():
    measurments = loadtxt(sys.argv[1])
    X, Y = transpose(measurments)
    X = transpose(X)
    Y = transpose(Y)
    Xp  = powers(X,0,int(sys.argv[2]))
    Yp  = powers(Y,1,1)
    Xpt = transpose(Xp)
    a = matmul(linalg.inv(matmul(Xpt,Xp)),matmul(Xpt,Yp))
    a = a[:,0]
    X2 = linspace(min(X), max(X), num=int(((max(X)-min(X))/0.2))).tolist()
    Y2 = []
    for i in range(len(X2)):
        Y2.append(poly(a,X2[i]))

    plt.plot(X,Y,"ro")
    plt.plot(X2,Y2)
    plt.show()

def poly(a,x):
    ret = 0
    for i in range(size(a)):
        ret += a[i]*x**i
    return ret


native_regression()
