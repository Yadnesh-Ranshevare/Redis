# Content
1. [Introduction](#introduction)
2. [String or Numbers](#string-or-numbers   )


---

# Introduction

Redis is an open-source, in-memory key-value data store that can be used as a database, cache, or message broker.


It is designed for high speed, supports different data structures (like strings, lists, sets, hashes), and is often used to make applications faster and more scalable.

### Key Features of Redis
1. **In-memory** → It stores data in RAM (very fast access).
2. **Key-value store** → Data is stored in key value pairs like JSON 
3. **Super fast** → Much faster than traditional databases because it avoids slow disk reads/writes (though it can also persist to disk if needed).
4. **Supports many data structures** → Not just strings, but also lists, sets, hashes, sorted sets, streams, etc.
5. **Caching** → keep the data in cache for fast retrieval
6. **Volatility** → Stored data is lost if the redis server crashes

### Why Redis Is Soo fast
1. **In-memory storage:**
    - Data is stored in RAM instead of hard disk.
    - RAM access is measured in nanoseconds, while disk access is in milliseconds (thousands of times slower).
2. **Efficient data structures:**
    - Redis uses optimized structures (hash tables, skip lists, etc.) that make lookups and updates very quick.
3. **Single-threaded event loop**
    - Redis runs on a single thread (by default) → no overhead of context switching between threads.
    - Uses an event-driven model to handle many requests very efficiently.
4. **Pipelining & batching:**
    - Redis can handle multiple commands in one go instead of one-by-one, reducing network round trips.
5. **Minimal overhead:**
    - Redis is written in C (a very fast, low-level language).
    - It avoids heavy features of traditional databases (like joins, complex transactions).



### Single Thread Event Loop

**Thread:** 
- A thread is the smallest unit of execution in a program.
- Think of it like a worker in a factory.
- A program (like a factory) can have one or many threads (workers).
- Single-threaded → Only 1 worker does all tasks one by one.
- Multi-threaded → Many workers can do tasks at the same time.
- Redis is single-threaded, meaning it uses only one thread to handle all requests.


**Event Loop:**
- An event loop is like a to-do list manager for that single thread.
- Redis receives requests (like `SET`, `GET`, `EXPIRE`). Instead of handling them one-by-one slowly, it puts them in a queue.
- The event loop processes them very quickly, one after another, without wasting time.
- An event loop is a programming mechanism that continuously checks for events (like requests, messages, or tasks) and processes them one by one.
- Since Redis commands are very lightweight and fast, this single-threaded approach actually outperforms many multi-threaded systems (less context switching overhead).

### Redis Core and Redis Stack
**Redis Core**
- Redis Core is the basic, original Redis.
- It provides the fundamental features:
    - In-memory key-value store
    - Basic data structures (strings, lists, sets, hashes, sorted sets, streams)
    - Persistence (RDB, AOF)
    - Pub/Sub messaging
    - High performance (single-threaded event loop)
- Use Redis Core if you only need simple caching, session storage, or pub/sub.
- in short: lightweight, fast, core Redis database.

**Redis Stack**
- Redis Stack is an extended version of Redis Core.
- It includes extra modules and features for modern applications.
- Adds support for:
    - Search & Query → Full-text search, secondary indexes (via RediSearch).
    - JSON → Store and query JSON documents (via RedisJSON).
    - Time Series → Efficient time-series data handling (via RedisTimeSeries).
    - Graphs → Store and query graph data (via RedisGraph).
    - Probabilistic Data Structures → Like Bloom filters (via RedisBloom).
- Use Redis Stack if you need advanced features like searching JSON docs, handling time-series, or querying graphs.
- in short: Redis Stack = Redis Core + extra modules for search, JSON, time-series, graphs, etc.

### Redis Data Types
1. **String** → Stores simple values (text or numbers).
2. **List** → Ordered collection of values (like an array).
3. **Set** → Unordered collection of unique values.
4. **Hash** → Stores field–value pairs (like a dictionary or JSON object).
5. **Sorted Set (ZSet)** → Like a set but each value has a score, and items are sorted by score (good for leaderboards).
6. **Bitmap** → Treats strings as bits, used for tracking true/false states.
7. **HyperLogLog** → Special type for estimating the number of unique items (approximate counting).87. **Stream** → Log of events/messages stored in order (good for event processing).

> Note: redis stores the data in key value pair

### Redis Key Naming Conventions
1. **Use colon (`:`) as a separator**:
    - In redis the colon is just a separator — like a slash / in file paths or a dot . in website addresses.
It makes long keys easier to organize and read.
    - If you save user data with key like this: 
    ```nginx
    user1001name  
    user1001email  
    ```
    It will be hard to read
    - so Use colons to separate parts:
    ```pgsql
    user:1001:name  
    user:1001:email  
    ```
    Here\
        user → category\
        1001 → user ID\
        name / email → property
    > Colon is just for readability and organization
2. **Avoid very long keys**
    - Keys are stored in memory → shorter is better.
    - Redis recommends keeping keys less than 1 KB.
3. **Avoid very short or unclear keys**
    - Don’t use `u1` → better use `user:1`.
4. **Keep keys human-readable**
    - Easy to understand what data they represent.
    - Example: `session:abcd1234` instead of `s:1`.
5. **Be consistent**
    - Choose one pattern and stick with it across your project.

> This naming convention are not compulsory, and redis server will not crash if you don't follow them. They are just standard way to name the data in redis 


[Go To Top](#content)

---
# String or Numbers
Strings are just binary-safe values stored under a key.

Think of them as `"key" → "value"` pairs, just like a dictionary in Python or object in JavaScript.

> in redis number are stores as a string as well


<a href="https://redis.io/docs/latest/commands/?group=string" target="_blank">Visit the official docs of redis to understand the all of the commands related to String<a/>

### Common String Commands

#### 1. SET & GET
```bash
SET user:1 "Yadnesh"
GET user:1
```
>Output: `"Yadnesh"`
#### 2. Update / Overwrite
```bash
SET user:1 "Ravi"
```
#### 3. Increment / Decrement (if value is a number)
```bash
SET counter 10
INCR counter     # counter = 11
DECR counter     # counter = 10
INCRBY counter 5 # counter = 15
DECRBY counter 5 # counter = 10
```
#### 4. Check if key exists
```bash
EXISTS user:1
```
#### 5. Expire (auto-delete key after time)
```bash
SET otp "123456"
EXPIRE otp 60   # Key will be deleted after 60 seconds
```
#### 6. Append
```bash
APPEND message "Hello"
APPEND message " World"
GET message
```
>Output: `"Hello World"`
#### 7. MSET / MGET (multiple values)
```bash
MSET name "Alice" age "21" city "Pune"
MGET name age city
```
>Output: `"Alice" "21" "Pune"`

#### 8. GETRANGE 
`GETRANGE` in Redis is used to extract a substring (or slice of bytes) from a stored string.

Syntax:
```bash
GETRANGE key start end
```
- **key** → the string key.
- **start** → starting index (0-based).
- **end** → ending index (inclusive).
> Indexing works like arrays in programming.


Example
```bash
SET message "Hello World"
GETRANGE message 0 4
```
>Output: `"Hello"` (characters 0 → 4)


Special Cases:
1. If you use -1, it means “last character”.
    ```bash
    GETRANGE message 0 -1
    ```
    >Output: `"Hello World"` (full string)

2. If the range goes beyond the string length, it just returns what’s available.
    ```bash
    GETRANGE message 0 50
    ```
    >Output: `"Hello World"`

3. If the key does not exist → returns an empty string.

#### 9. SETRANGE
If `GETRANGE` is for reading part of a string, then `SETRANGE` is for overwriting part of a string.

Syntax:
```bash
SETRANGE key offset value
```
- **key** → the string key.
- **offset** → the position (0-based index) where you want to start writing.
- **value** → the new substring to write.

Example:
```bash
SET message "Hello World"
SETRANGE message 6 "Redis"
GET message
```
>Output: **"Hello Redis"**

Special Cases
1. Overwrite in middle

    ```bash
    SET name "Yadnesh"
    SETRANGE name 0 "R"
    GET name
    ```
    > Output: `"Radnesh"`
2. Offset beyond current string length\
If the offset is bigger than the string size, Redis pads the gap with \0 (null bytes).
    ```bash
    SETRANGE newKey 5 "Hi"
    GET newKey
    ```
    >Output: "\u0000\u0000\u0000\u0000\u0000Hi"\
    >  (Null bytes + "Hi")



[Go To Top](#content)

---