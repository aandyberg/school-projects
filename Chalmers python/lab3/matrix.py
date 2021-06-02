def transpose(matrix):
    matrixLength = len(matrix)
    if(matrixLength > 0):
        newMatrix = [[matrix[i][j] for i in range(matrixLength)] for j in range(len(matrix[0]))]
        return newMatrix
    else:
        return matrix


def powers(list, num1, num2):
    poweredMatrix = [[list[j]**i for i in range(num1,num2+1)] for j in range(len(list))]
    return poweredMatrix


def matmul(s1,s3):
    mulitpliedMatrix = [[0 for x in range(len(s3[0]))] for y in range(len(s1))]
    for i in range(len(s1)):
        for j in range(len(s3[0])):
            for k in range(len(s3)):
                mulitpliedMatrix[i][j] += s1[i][k] * s3[k][j]

    return mulitpliedMatrix

def invert(matrix):
    det = (matrix[0][0]*matrix[1][1]) - (matrix[0][1] * matrix[1][0])
    invertedMatrix = [[matrix[1][1]/det, -matrix[0][1]/det], [-matrix[1][0]/det, matrix[0][0]/det]]
    return invertedMatrix


def loadtxt(file):
    matrix = []
    with open(file) as file:
        for line in file:
            floatList = []
            for f in line.split():
                floatList.append(float(f))
            matrix.append(floatList)
    return matrix
