===创建GIT项目==

touch README.md 						//新建说明文件
git init 							//在当前项目目录中生成本地git管理,并建立一个隐藏.git目录
git add . 							//添加当前目录中的所有文件到索引
git commit -m "first commit" 					//提交到本地源码库，并附加提交注释
git remote add origin http://www.xxx.Com/JosonJiang.Git		//添加到远程项目，别名为 origin 粘贴复制的地址 https://github.com/JosonJiang/XManages.git
git push -u origin master 					//把本地源码库push到github 别名为origin的远程项目中，确认提交



===更新GIT项目============================================================================================

cd 根目录
git add .
git commit -m "update 描述信息" 				//检测文件改动并附加提交注释
git push -u origin master   					//提交修改到项目主线 .别名为 origin


如果过程中出现‘please enter a commit message...’,首先esc然后输入   ：wq即可



===添加GIT项目文件或文件夹============================================================================================

cd 根目录
git add *.txt
git commit -m "添加文件备注信息" 				//检测文件改动并附加提交注释
git push -u origin master   					//提交修改到项目主线 .别名为 origin


如果过程中出现‘please enter a commit message...’,首先esc然后输入   ：wq即可




===同步更新GIT项目=======================================================================================

拉取远程的Repo到本地（如果已经在本地，可以略过） 
$ git clone https://github.com/JosonJiang/XManages.git

在本地仓库删除文件 
$ git rm 我的文件

在本地仓库删除文件夹 
$ git rm -r 我的文件夹/

此处-r表示递归所有子目录，如果你要删除的，是空的文件夹，此处可以不用带上-r。

提交代码 
$ git commit -m"我的修改"

推送到远程仓库（比如GitHub） 
$ git push origin https://github.com/JosonJiang/XManages.git


============Git 删除远程仓库文件===========================================================================

使用 git rm 命令即可，有两种选择.

一种是 git rm --cached "文件路径"		不删除物理文件，仅将该文件从缓存中删除；
一种是 git rm --f "文件路径"			不仅将该文件从缓存中删除，还会将物理文件删除（不会回收到垃圾桶）



Git 如何删除远程服务器文件同时保留本地文件



1、删除远程Joson.txt文件,本地保留

git rm --cached Joson.txt
git commit -m "delete file"
git push

2、删除远程bin文件夹,本地保留
git rm --cached -r bin
git commit -m "delete directory"
git push

=========================本地仓库更换绑定的远程仓库====================================================================




方法一 通过命令直接修改远程地址 

进入git_test根目录 
git remote https://github.com/JosonJiang/XManages.git	查看所有远程仓库， git remote XManages.git 查看指定远程仓库地址 
git remote set-url origin https://github.com/JosonJiang/JosonJiangXManages.git


方法二 通过命令先删除再添加远程仓库 

进入git_test根目录 
git remote https://github.com/JosonJiang/XManages.git  查看所有远程仓库， git remote XManages.git 查看指定远程仓库地址 
git remote rm origin 
git remote add origin https://github.com/JosonJiang/JosonJiangXManages.
git

方法三 直接修改配置文件 .git/config













1、create a new repository on the command line

echo "# XManages" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/JosonJiang/XManages.git
git push -u origin master



2、push an existing repository from the command line

git remote add origin https://github.com/JosonJiang/XManages.git
git push -u origin master