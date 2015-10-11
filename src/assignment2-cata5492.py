#import Queue as queue
import math
import sys

class Node(object):
	#Simple node class

	def __init__(self, xvalue, yvalue):
		if not isinstance(xvalue, int):
			print "Value is not an integer. Please use an integer."
			raise TypeError
		if not isinstance(yvalue, int):
			print "Value is not an integer. Please use an integer."
			raise TypeError

		self.x = xvalue
		self.y = yvalue
		self.distanceToStart = 0
		self.heuristic = None
		self.f = None
		self.parent = None

	def setDistance(self, parent, val, heur):
		self.parent = parent
		parentDist = abs(parent.x-self.x) + abs(parent.y-self.y)
		if(parentDist == 2):
			self.distanceToStart = parent.distanceToStart + 14
		elif(parentDist == 1):
			self.distanceToStart = parent.distanceToStart + 10
		if(val == 1):
			self.distanceToStart += 10
		if(heur == 'M'):
			self.heuristic = abs(9-self.x) + abs(7-self.y)
		else:
			self.heuristic = (abs(9-self.y*10) + abs(7-self.x*10)) ** 2
		self.f = self.distanceToStart + self.heuristic

	def compare(self, trialParent, val):
		parentDist = abs(trialParent.x-self.x) + abs(trialParent.y-self.y)
		trialDist = 0
		if(parentDist == 2):
			trialDist = trialParent.distanceToStart + 14
		elif(parentDist == 1):
			trialDist = trialParent.distanceToStart + 10
		if(val == 1):
			trialDist += 10
		if(trialDist < self.distanceToStart):
			self.distanceToStart = trialDist
			self.parent = trialParent
			self.f = self.distanceToStart + self.heuristic

	def equalz(self, other):
		return (self.x == other.x and self.y == other.y)

def aStar(matrix, heur):
	openQ = []
	closed = [Node(-1,-1)]
	start = Node(0,0)
	openQ.append(Node(0,0))
	count = 0
	while(not closed[-1].equalz(Node(9,7)) and len(openQ) > 0):
		openQ.sort(key = lambda x: x.f)
		o = openQ[0]
		openQ.remove(o)
		closed.append(o)

		for i in range(-1,2):
			for j in range(-1,2):
				xv = o.x+i
				yv = o.y+j
				if(xv >= 0 and xv <= 9 and yv >= 0 and yv <= 7):
					count += 1
					n = Node(xv, yv)
					boot = True
					for bc in closed:
						if bc.equalz(n):
							boot = False
					if(matrix[xv][7-yv] is not 2 and boot):
						n = Node(xv, yv)
						boo = True
						for b in openQ:
							if b.equalz(n):
								boo = False
						if boo:
							openQ.append(n)
							n.setDistance(o, matrix[xv][7-yv], heur)
						else:
							n.compare(o, matrix[xv][7-yv])
	k = closed[-1]
	print("Distance: ", k.distanceToStart, ". Locations evaluated: ", count, ".\n")
	final = []
	while(k != None):
		final.insert(0, k)
		k = k.parent
	for i in final:
		print(i.x, i.y)

if __name__ == "__main__":
	if(len(sys.argv) != 3):
		print("Usage: python assignment2-cata5492.py World# heuristic(Manhatten, Cameron)")
		sys.exit(0)
	fp = ''
	heur = ''
	if(sys.argv[1] == "World1"):
		fp = 'World1.txt'
	elif(sys.argv[1] == "World2"):
		fp = 'World2.txt'
	else:
		print("Invalid World")
		sys.exit(0)
	if(sys.argv[2] == "Manhatten"):
		heur = 'M'
	elif(sys.argv[2] == "Diagonal"):
		heur = 'D'
	else:
		print("Invalid heuristic")
		sys.exit(0)
	game = [[], [], [], [], [], [], [], [], [], []]
	with open(fp) as f:
		for line in f:
			for i, value in enumerate(line.split()):
				game[i].append(int(value))
	
	aStar(game, heur)