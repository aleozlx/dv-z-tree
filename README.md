# dv-z-tree
Z-Tree spatial ordering interactively visualized

## Screenshot
![Convolutional access pattern](https://raw.githubusercontent.com/watupraccoons/dv-z-tree/master/conv_access.png "Convolutional access pattern")

Left side shows, for different tile sizes, which
tiles contain the mouse pointer respectively. Number in
that cell is index in z-ordering.
Each tile is guaranteed to be allocated in a 
continuous memory space by storing the matrix
with z-ordering.

Right side shows the memory access pattern of convolutional operation on either
z-ordering (top) or C-style row-oriented (bottom) 2D array.
+ Blue line - number of times (y axis) that the memory address (x axis) is visited.
+ Red line - number of times that different sizes of memory space is jumped across.

Z ordering can also apply to multidimensional arrays for better spatial coherence
in many frequently used data access patterns. e.g. row/column scanning,
convolutional operation, even diagonal access if you are doing some 
algorithm like dynamic programming. 

In this project a "slow" version (which also works for any arbitrary spatial ordering like z-ordering with simple change of kernel function),
and a "fast" version (which transforms between 2d coordinates and z-indices via simple bit operation) are implemented.

## Conclusion
As another counterintuitively genius way of storing a matrix, Z-ordering can be good for many regular data access patterns with little
performance cost. It's certainly a compromise between row and column oriented ordering.
It is also a kind of useful adaptive tiling technique.

## Related links
+ [Damn Cool Algorithms: Spatial indexing with Quadtrees and Hilbert Curves](http://blog.notdot.net/2009/11/Damn-Cool-Algorithms-Spatial-indexing-with-Quadtrees-and-Hilbert-Curves)
+ Data visualization: [D3 API](https://github.com/d3/d3/blob/master/API.md#brushes-d3-brush)
