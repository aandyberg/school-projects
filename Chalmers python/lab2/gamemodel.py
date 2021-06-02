from math import sin,cos,radians
import random

#TODO: Deal with all TODOs in this file and also remove the TODO and HINT comments.

""" This is the model of the game"""
class Game:
    """ Create a game with a given size of cannon (length of sides) and projectiles (radius) """
    def __init__(self, cannonSize, ballSize):
        p1 = Player("blue", -90, self, "right")
        p2 = Player("red", 90, self, "left")
        self.players = [p1, p2]
        self.currentPlayer = 0
        self.currentWind = round(random.uniform(-10, 10),2)
        self.cannonSize = cannonSize
        self.ballSize = ballSize
    """ A list containing both players """
    def getPlayers(self):
        return self.players

    """ The height/width of the cannon """
    def getCannonSize(self):
        return self.cannonSize

    """ The radius of cannon balls """
    def getBallSize(self):
        return self.ballSize

    """ The current player, i.e. the player whose turn it is """
    def getCurrentPlayer(self):
        current = self.getCurrentPlayerNumber()
        return self.players[current]

    """ The opponent of the current player """
    def getOtherPlayer(self):
        if self.players[0] == self.getCurrentPlayer():
            return self.players[1]
        else:
            return self.players[0]


    """ The number (0 or 1) of the current player. This should be the position of the current player in getPlayers(). """
    def getCurrentPlayerNumber(self):
        return self.currentPlayer

    """ Switch active player """
    def nextPlayer(self):
        if self.currentPlayer == 0:
            self.currentPlayer = 1
        else:
            self.currentPlayer = 0


    """ Set the current wind speed, only used for testing """
    def setCurrentWind(self, wind):
        self.currentWind = wind


    def getCurrentWind(self):
        return self.currentWind

    """ Start a new round with a random wind value (-10 to +10) """
    def newRound(self):
        self.currentWind = round(random.uniform(-10, 10),2)

""" Models a player """
class Player:
   #TODO: You need to create a constructor here.
   #HINT: It should probably take the Game that creates it as parameter and some additional properties that differ between players (like firing-direction, position and color)
    def __init__(self, col, pos, game, direction):
        self.color = col
        self.position = pos
        self.score = 0
        self.angle = 45
        self.velocity = 40
        self.game = game
        self.direction = direction

    """ Create and return a projectile starting at the centre of this players cannon. Replaces any previous projectile for this player. """
    def fire(self, angle, velocity):
        # The projectile should start in the middle of the cannon of the firing player
        # HINT: Your job here is to call the constructor of Projectile with all the right values
        # Some are hard-coded, like the boundaries for x-position, others can be found in Game or Player
        wind = self.game.getCurrentWind()
        xpos = self.getX()
        ypos = self.game.getCannonSize() / 2
        xLower = -110
        xUpper = 110
        if self.direction == "left":
            angle = -angle
            velocity = -velocity
        self.angle = abs(angle)
        self.velocity = abs(velocity)
        return Projectile(angle, velocity, wind, xpos, ypos, xLower, xUpper)

    """ Gives the x-distance from this players cannon to a projectile. If the cannon and the projectile touch (assuming the projectile is on the ground and factoring in both cannon and projectile size) this method should return 0"""
    def projectileDistance(self, proj):
        # HINT: both self (a Player) and proj (a Projectile) have getX()-methods.
        # HINT: This method should give a negative value if the projectile missed to the left and positive if it missed to the right.
        # The distance should be how far the projectile and cannon are from touching, not the distance between their centers.
        # You probably need to use getCannonSize and getBallSize from Game to compensate for the size of cannons/cannonballs
        ballsize = self.game.getBallSize()
        cannonSize = self.game.getCannonSize() / 2

        distance = proj.getX() - self.getX()
        if 0 > distance:
            distance = distance + ballsize + cannonSize
            if distance > -cannonSize:
                distance = 0
        elif 0 < distance:
            distance = distance - ballsize - cannonSize
            if distance < cannonSize:
                distance = 0

        if -10 > distance > 0:
            distance = 0
        return distance

    """ The current score of this player """
    def getScore(self):
        return self.score

    """ Increase the score of this player by 1."""
    def increaseScore(self):
        self.score += 1

    """ Returns the color of this player (a string)"""
    def getColor(self):
        return self.color

    """ The x-position of the centre of this players cannon """
    def getX(self):
        return self.position

    """ The angle and velocity of the last projectile this player fired, initially (45, 40) """
    def getAim(self):

        return self.angle, self.velocity



""" Models a projectile (a cannonball, but could be used more generally) """
class Projectile:
    """
        Constructor parameters:
        angle and velocity: the initial angle and velocity of the projectile
            angle 0 means straight east (positive x-direction) and 90 straight up
        wind: The wind speed value affecting this projectile
        xPos and yPos: The initial position of this projectile
        xLower and xUpper: The lowest and highest x-positions allowed
    """
    def __init__(self, angle, velocity, wind, xPos, yPos, xLower, xUpper):
        self.yPos = yPos
        self.xPos = xPos
        self.xLower = xLower
        self.xUpper = xUpper
        theta = radians(angle)
        self.xvel = velocity*cos(theta)
        self.yvel = velocity*sin(theta)
        self.wind = wind


    """
        Advance time by a given number of seconds
        (typically, time is less than a second,
         for large values the projectile may move erratically)
    """
    def update(self, time):
        # Compute new velocity based on acceleration from gravity/wind
        yvel1 = self.yvel - 9.8*time
        xvel1 = self.xvel + self.wind*time

        # Move based on the average velocity in the time period
        self.xPos = self.xPos + time * (self.xvel + xvel1) / 2.0
        self.yPos = self.yPos + time * (self.yvel + yvel1) / 2.0

        # make sure yPos >= 0
        self.yPos = max(self.yPos, 0)

        # Make sure xLower <= xPos <= mUpper
        self.xPos = max(self.xPos, self.xLower)
        self.xPos = min(self.xPos, self.xUpper)

        # Update velocities
        self.yvel = yvel1
        self.xvel = xvel1

    """ A projectile is moving as long as it has not hit the ground or moved outside the xLower and xUpper limits """
    def isMoving(self):
        return 0 < self.getY() and self.xLower < self.getX() < self.xUpper

    def getX(self):
        return self.xPos

    """ The current y-position (height) of the projectile". Should never be below 0. """
    def getY(self):
        return self.yPos
