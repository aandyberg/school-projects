# Imports everything from both model and graphics
from gamemodel import *
from gamegraphics import *

# Here is a nice little method you get for free
# It fires a shot for the current player and animates it until it stops
def graphicFire(game, angle, vel):
    player = game.getCurrentPlayer()
    # create a shot and track until it hits ground or leaves window
    gproj = player.fire(angle, vel)
    while gproj.isMoving():
        gproj.update(1/50)
        update(50)
    return gproj

def inputWin(ggame):
    oldAngle, oldVel = ggame.getCurrentPlayer().getAim()
    wind = ggame.getCurrentWind()
    inputWin = InputDialog(oldAngle, oldVel, wind)
    choice = inputWin.interact()
    if choice == "Quit":
        return False
    newAngle, newVel = inputWin.getValues()
    inputWin.close()
    return newAngle, newVel

def finishShot(game, proj):
    player = game.getCurrentPlayer()
    otherPlayer = game.getOtherPlayer()
    distance = otherPlayer.projectileDistance(proj)
    if distance == 0.0:
        player.increaseScore()
        game.newRound()
    game.nextPlayer()

def graphicPlay():
    ggame = GraphicGame(Game(10,3))
    while True:
        oldAngle, oldVel = ggame.getCurrentPlayer().getAim()
        wind = ggame.getCurrentWind()
        inputWin = InputDialog(oldAngle, oldVel, wind)
        choice = inputWin.interact()
        if choice == "Quit":
            break
        angle, vel = inputWin.getValues()
        inputWin.close()

        gproj = graphicFire(ggame, angle, vel)

        finishShot(ggame, gproj)

    # TODO: This is where you implement the game loop
    # HINT: Creating a GraphicGame is a good start.
    # HINT: You can look at the text interface for some inspiration
    # Note that this code should not directly work with any drawing or such, all that is done by the methods in the classes



# Run the game with graphical interface
graphicPlay()
