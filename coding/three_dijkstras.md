<a href="../coding.html" style="color:gray"><u><< Back to "Coding"</u></a>

# Three Dijkstra's, One Path

### 0. Prologue

So I did it again.

After 9 weeks of relentless lectures and deadline battles, I sat down at the countdown timer once more. The last contest still felt like yesterday; however, I definitely came more prepared this time. Not only that I finished setting up my iPad as a second screen, but the [COMP40008 lectures](https://www.imperial.ac.uk/computing/current-students/courses/40008/) I took over the past weeks really helped me build a systematic understanding of algorithms.

The start was quite fine. Q1 didn't load well so I headed to Q2. Think, write, type... the feeling was coming back. Few careless bugs; never mind that, I aimed for the big.

Without much of a struggle, 30 minutes in, I arrived at Q4. A gasp escaped me upon the first glance –

A graph problem.

They were my nightmares.

"But not anymore!" I thought, and started reading...

### 1. The problem

The problem is LeetCode [2203. Minimum Weighted Subgraph With the Required Paths](https://leetcode.com/contest/weekly-contest-284/problems/minimum-weighted-subgraph-with-the-required-paths/).

> This problem concerns with a **weighted directed** graph $G$ with `n` nodes, numbered from `0` to `n-1`. $arcs[G]$ are given as a 2D integer array `edges`, where `edges[i] = [from_i, to_i, weight_i]` represents an arc **directed** from `from_i` to `to_i` with `weight_i`.  The task is to find the **minimum weighted subgraph** of $G$ allowing access from nodes `src1`, `src2` to `dest`, all given as **pairwise distinct** integers. 

Other constraints:

> - `n` $\in[3,10^5]$
> - `edges.length` $\in[0,10^5]$
> - `edges[i].length` $=3$
> - `from_i, to_i, src1, src2, dest` $\in[0,n-1]$
> - `weight_i` $\in[1,10^5]$

Example graph:

<img src="https://assets.leetcode.com/uploads/2022/02/17/example1drawio.png" style="zoom: 67%;" ></img>

> Where `n = 6, edges = [[0,2,2],[0,5,6],[1,0,3],[1,4,5],[2,1,1],[2,3,3],[2,3,4],[3,4,2],[4,5,1]], src1 = 0, src2 = 1, dest = 5`.
>
> The answer is 9 as demonstrated by the subgraph in blue.

### 2. Thinking through

#### 2.1 Intuition

Since graph problems typically (including this one) don't allow negatively weighted arcs, the resulting minimum subgraph $G'$, if exists, needs to be trimmed as much as possible. In particular:

- No arcs in $G'$ should be directed away from `dest`;
- No arcs in $G'$ should be directed into `src1` or `src2`;
- All arcs in $G'$ should be part of a path from either `src1` or `src2` to `dest`;
- $G'$ has no cycles or diamonds.

Where points 1, 2 above are in fact special cases of 3. Now the task becomes clear:

*Find a subgraph* $G'=P_1\cup P_2$ *consisting of only a path* $P_1$ *from* `src1` *to* `dest` *and a path* $P_2$ *from* `src2` *to* `dest`, *such that the sum of weights of* $arcs[G']$ *is at minimum.*

Note that, the shortest (minimum weighted, same below) path from `src1` to `dest` in $G$ for example, is not necessarily in $G'$. The reason is that if $P_1$ and $P_2$ meets at some node `junc` before reaching `dest`, the weights of arcs at $P_3=P_1\cap P_2$ from `junc` to `dest` are only counted once. This could potentially sacrifice some individual shorter paths for a better communal $P_3$. To maximise this, $G'$ might be:

- A (shortest) path from `src1` to `src2`, plus a (shortest) path from `src2` to `dest`, making $P_2=P_3$;
- A (shortest) path from `src2` to `src1`, plus a (shortest) path from `src1` to `dest`, making $P_1=P_3$;
- For some intermediate node `junc`, the (shortest) paths from `src1` and `src2` to `junc` plus a (shortest) path from `junc` to `dest`.

I realised only after the contest that points 1, 2 above are in fact special cases of 3 with `junc == src2` and `junc == src1` respectively. This will be discussed in more details in the solution.

#### 2.2 Dijkstra's algorithm

Now comes the fun part. Which algorithm to choose? As I need to compute the shortest path from nodes `src1`, `src2` to arbitrary node `junc`, **Dijkstra's algorithm** immediately comes to mind.

This is a classic algorithm that I learned about a month ago. It builds a spanning tree that reaches each child node via its shortest path from the root. From the lectures, I have made brief notes as follows:

> - For each tree/fringe node, store its $parent$ node in the tree and the distance of the known shortest path
> - The fringe node with the smallest distance from the tree is added to the tree each time, followed by updating the fringe and (possibly) improving the current shortest path
> - Finally, obtain the shortest path to node $x$ in reverse order from $parent[x]$ function

This algorithm runs in $O(m\log n)$ time with a priority queue. More details about this algorithm can be found [here](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm).

#### 2.3 The story

"A-ha!" I laughed. 

I have certainly been waiting for this – not only that I was looking forward to solving this hardest last question, but also for a chance to put my <s>very expensive</s> very informative lecture materials learnt into some good use.

The excitement did not last long, however. Soon as I calmed myself down to focus on the program, two troubles came to mind:

- I never implemented this using a programming language myself.

Unlike some other algorithms I used in past contests, the idea of this one was still quite new to me at the moment. However, I saw this as a good opportunity to get me started – it was not an exam or interview, after all. (Phew~!) Now that there's still an hour left, I just need to take some time to familiarise myself, review my notes and translate them into code.

This shouldn't be too hard.

Right?

Unless...

- The contest runs at 2.30am-4am GMT.

And right before this, I was burning my brain learning to improve my first website ([which website?](https://www.doc.ic.ac.uk/~bl1821/)). I was so exhausted that the screen started to blur before my eyes...

Using the last energy left in me, I wrote down some code:

```java
long res = 0L;
// res = min(src1 -> src2 -> dest, src2 -> src1 -> dest, min_n(src1 -> n + src2 -> n -> dest))
return res;
```

...and climbed into bed.

### 3. The solution

#### 3.1 A better graph

Considering that the number of nodes and arcs can both go up to $10^5$, it is important that the graph representation can handle access of all descendants of a node efficiently while using a reasonable amount of memory. Assuming a graph with $m$ arcs and $n$ nodes, some candidates include:

- The given 2D array `edges` of type `int[][]` where `edges[i] = [start_i, end_i, weight_i]`.

  The original structure uses $O(m)$ space, but searching for all descendants of a node also requires $O(m)$ time.

- An adjacency matrix `mat[][]` of type `int[][]` where `mat[i][j]` represents the weight of the shortest arc from node `i` to `j`.

  A rather intuitive solution to achieve $O(1)$ access, however takes $O(n^2)$ memory. Since $m$ and $n$ share the same upper bound, the matrix tends to be sparse for big values of $n$ and potentially leads to MLE situations.

- An improvement `map` of type `Map<Integer,Map<Integer,Integer>>`  where `map.get(i).get(j)` represents the weight of the shortest arc from node `i` to `j`.

  One of my favourite data structure in contests, and an easy method to come up with and implement when I need $O(1)$ access and $O(m)$ space. Unfortunately hashing is often quite expensive; performing this operation at a large scale sometimes causes TLE.

- An adjacency list `ls` of type `List<List<Pair<Integer,Integer>>>` where `ls.get(i) = [(j, w)]` represents a list of arcs from node `i` to `j` with weight `w`. *(Thanks [@bridgecat](https://www.doc.ic.ac.uk/~zq621/))*

  Turns out that simple structures can be best structures! Since the nodes are guaranteed to lie consecutively between `0` and `n-1`, the outer `Map` can be replaced with a `List` without worrying about wasting index. The problem doesn't require random access of node descendants either – which means that a `List` can be used again to avoid the large constant of `Map` access.

To store the weight of arcs, Java provides a `Map.Entry` interface as an option; however, I implemented my own simple generic version (although this problem only concerns with the `Integer` type) of `Pair` class for the sake of flexibility and practising:

```java
private static class Pair<K, V> {
  K key;
  V val;
  public Pair(K key, V val) {
    this.key = key;
    this.val = val;
  }
} 
```

The generic design soon proved itself useful: again since the number of arcs and arc weights are both bounded by $10^5$, the program can potentially produce a result exceeding the limit of `Integer` values; a `Long` return type is used instead. To transform the graph into an adjacency list, now of the type `List<List<Pair<Integer,Long>>>`:

```java
public List<List<Pair<Integer, Long>>> parse(int[][] edges, int n) {
  final List<List<Pair<Integer, Long>>> res = new ArrayList<>();
  for (int i = 0; i < n; i++) res.add(new ArrayList<>());
  for (int[] e : edges) res.get(e[0]).add(new Pair<>(e[1], (long) e[2]));
  return res;
}
```

#### 3.2 The algorithm

As the title suggests, my solution applies Dijkstra's algorithm three times to build spanning trees associated with `src1`, `src2` and `dest` respectively. Notice that the algorithm computes the shortest paths *from* a node; however, to find the optimal `junc`, I also need to know the shortest paths *to* the node `dest`. To achieve this, I added an extra `boolean rev` parameter to the original `parse` function:

```java
public List<List<Pair<Integer, Long>>> parse(int[][] edges, int n, boolean rev) {
  final List<List<Pair<Integer, Long>>> res = new ArrayList<>();
  for (int i = 0; i < n; i++) res.add(new ArrayList<>());
  for (int[] e : edges) {
    if (rev) {
      res.get(e[1]).add(new Pair<>(e[0], (long) e[2]));
    } else {
      res.get(e[0]).add(new Pair<>(e[1], (long) e[2]));
    }
  }
  return res;
}
```

Such that it swaps around the start and end of each arc when `rev` is true. This operation effectively reverses the graph, so that the distance calculated *from* a node in the reversed graph is in fact the distance *to* that node in the original graph. 

Now I can implement Dijkstra's algorithm, which returns a `long[]` indicating the distance from a particular node. Notice that I don't need to maintain the path itself, so that recording of `parent` can be omitted from the algorithm:

```java
public long[] dijkstra(List<List<Pair<Integer, Long>>> graph, int n, int src) {
  final long[] dist = new long[n];
  Arrays.fill(dist, -1);
  
  final PriorityQueue<Pair<Integer, Long>> pq = new PriorityQueue<>(Comparator.comparingLong(a -> a.val));
  pq.offer(new Pair<>(src, 0L));

  while (!pq.isEmpty()) {
    final Pair<Integer, Long> node = pq.poll();
    if (dist[node.key] >= 0) continue;
    dist[node.key] = node.val;
    graph.get(node.key).forEach(next -> pq.offer(new Pair<>(next.key, next.val + node.val)));
  }
  return dist;
}
```

Another implementation detail that confused me a lot was the mysterious `decreaseKey` operation. According to my lecture notes, this function locates an item in the priority queue and changes its associated key to a lower value. It is used to update a new shortest distance of a fringe node as one of its precedent node is added to the tree.

However, the `PriorityQueue` class provided by the `java.util` package doesn't support this operation, nor does it give an elegant and efficient way to achieve it. After some forum browsing and asking around, I realised that it can simply be replaced by offering the item to the queue with the new key: 

- As how `PriorityQueue` operates, the item with the lowest key always gets polled first, by which time it is added to the tree as the shortest distance; [line $11-12$]
- When the same item of another key gets polled (which is guaranteed not to be lower), it can be discarded by checking that it is already in the tree (the shortest distance has been computed). [line $10$]

Since an item can be present in the queue with multiple keys as a result of different arcs directed to it, the time complexity can increase from $O(\log n)$ to $O(\log m)$. As $m$ can be expressed as a polynomial of $n$ (at most $n^2$ with no parallel arcs), the order of complexity is unchanged.

#### 3.3 A working program

Finally, given the solution boilerplate:

```java
public long minimumWeight(int n, int[][] edges, int src1, int src2, int dest) {}
```

Using my modified `parse` function to produce both the graph and its reversed version:

```java
final List<List<Pair<Integer, Long>>> graph = parse(edges, n, false), graphRev = parse(edges, n, true);
```

And the shortest distances using the `dijkstra` function:

```java
final long[] from1 = dijkstra(graph, n, src1), from2 = dijkstra(graph, n, src2), to = dijkstra(graphRev, n, dest);
```

To find the optimal intermediate node following the scheme described earlier:

```java
long res = Long.MAX_VALUE;
for (int i = 0; i < n; i++) {
  if (from1[i] < 0 || from2[i] < 0 || to[i] < 0) continue;
  res = Math.min(res, from1[i] + from2[i] + to[i]);
}
return res == Long.MAX_VALUE ? -1 : res;
```

Notice that the cases of `junc` being `src1` or `src2` have already been taken care of as we traverse through all `n` nodes in the loop. The overall complexity is $O(m\log m)$ due to the `dijkstra` function.

### 0. Epilogue

This is the first coding blog (first blog, perhaps) I have ever written in my life, to be posted on the first website I have ever made. I had no idea what this was going to look like when I started – it was meant to be sort of a recreational experiment. I also wanted to add an epilogue just to complete the structure, but again didn't know what to write about. So I guess this is it then.

### Acknowledgements

- COMP40018 module, Imperial College London, [https://www.imperial.ac.uk/computing/current-students/courses/40008/]
- LeetCode problem 2203, LeetCode, [https://leetcode.com/contest/weekly-contest-284/problems/minimum-weighted-subgraph-with-the-required-paths/]
- Thanks [@bridgecat](https://www.doc.ic.ac.uk/~zq621/) for proofreading.