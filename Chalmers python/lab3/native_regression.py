from matrix import *
import matplotlib.pyplot as plt
import sys


def native_regression():
    measurments = loadtxt(sys.argv[1])
    X, Y = transpose(measurments)
    Xp  = powers(X,0,1)
    Yp  = powers(Y,1,1)
    Xpt = transpose(Xp)
    [[b],[m]] = matmul(invert(matmul(Xpt,Xp)),matmul(Xpt,Yp))
    Y2 = []
    for i in range(len(Y)):
        Y2.append(b+m*X[i])

    plt.plot(X,Y,"ro")
    plt.plot(X,Y2)
    plt.show()


native_regression()
