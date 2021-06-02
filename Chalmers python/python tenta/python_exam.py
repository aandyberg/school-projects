# Jag bekräftar härmed att jag inte kommunicerar med andra personer än kursens lärare under tentans gång.
# Jag är medveten om att fusk i tentan kan leda till disciplinåtgärder.
from random import choice
from graphics import *

#Fråga 1
def username(program, firstname, lastname):
    uName = program[:3] + firstname[:2] + lastname[:2]
    print(uName.lower())

def create_username():
    program = input("Vilket program studerar du?")
    name = input("Vad heter du? (För och efternamn)")
    split_name = name.split()
    username(program, split_name[0], split_name[1])

#Fråga 2
def test_choice(values, repetitions):
    dict = {}
    i = 0
    while i < repetitions:
        value = choice(values)
        if value in dict:
            dict[value] = dict[value] + 1
        else:
            dict[value] = 1
        i+= 1
    print(dict)

#Frgåa 3
class Target:
    def __init__(self, color1, color2, nbr):
        self.color1 = color1
        self.color2 = color2
        self.nbr = nbr
        self.circle = Circle(Point(200,200), 200)
        self.circle.setFill(color1)
        self.width = 200/self.nbr
        self.circleList = []
    def draw(self, win):
        for i in range(self.nbr):
            rad = 200 - (i*self.width)
            self.circle = Circle(Point(200, 200), rad)
            if i % 2 == 0:
                self.circle.setFill(self.color1)
            else:
                self.circle.setFill(self.color2)
            self.circle.draw(win)
            self.circleList.append(self.circle)

    def undraw(self):
        for circle in self.circleList:
            circle.undraw()
