# **Shader Graph Tool**

**Shader Graph Tool** (Based on Cocos Creator 3D v1.1.1) can import **Unity Shader Graph** files as Cocos Creator Effect files.

**Note** : **Unity Shader Graph** has more than 200 Shader Nodes, we had implemented about 100 Shader Nodes of them. Still working hard on it.

# Install

1. Clone to the `project/packages` folder

   `cd project/packages`

   `git clone git@github.com:2youyou2/shader-graph.git`

2. `git submodule update --init`
3. `cd extensions/shader-graph`
4. `npm install`

# Usage

1. Click the **shader-graph** menu on the top bar.

![image](https://user-images.githubusercontent.com/1862402/90206720-fb00c580-de16-11ea-8f20-40989e3d6196.png)

2. Add the src folder and dst folder to configuration.

   - The src folder should contains the _.ShaderGraph files and the relative _.ShaderSubGraph files.
   - Shader Graph will generate the effect files to the dst folder.

3. Click **generate** button

# Screenshots

![image](https://user-images.githubusercontent.com/1862402/90206312-f1c32900-de15-11ea-9db6-2cbb5df9df36.png)

![image](https://user-images.githubusercontent.com/1862402/90207181-2fc14c80-de18-11ea-88a5-6c16c45fd331.png)

![image](https://user-images.githubusercontent.com/1862402/90206362-09021680-de16-11ea-93e5-8890e0b9ce4d.png)

![image](https://user-images.githubusercontent.com/1862402/90206424-26cf7b80-de16-11ea-95f2-dbb1993ff9d8.png)
