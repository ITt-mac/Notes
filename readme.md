写在前面的话（初衷）：搞开发（ctrl+c/v）一年多，没用过git一直用的svn，感觉再不学一下，就真的说不过去了。既然要学，就要有个小目标吧===》实现vscode与git推拉同步代码。

需要安装以下软件：
1.msysgit：它是 Git 版本控制系统在 Windows 下的版本，也就是操作git的命令行窗口软件。
2.vscode ：一个很X的代码编辑器。
3.tortoisegit：图形化小乌龟，可以查看更新日志，也可以推拉同步代码带git上。这里多说一句，这个小乌龟和svn的小乌龟tortoisesvn是类似的。

安装步骤及说明：
1.msysgit，去到官网（https://gitforwindows.org/）找到对应的windows的版本，注意是32位的还是64位的，安装就可以了，实在不懂怎么安装可以看教程（http://jingyan.baidu.com/article/e52e36154233ef40c70c5153.html）。
2.vscode，同理官网（https://code.visualstudio.com/），如果想装个中文包可以看（https://code.visualstudio.com/docs/getstarted/locales）。
3.tortoisegit，下载地址（https://download.tortoisegit.org/tgit/）。网上有更详细的安装教程（https://download.tortoisegit.org/tgit/），可查阅。
安装完msysgit和tortoisegit之后右键鼠标会多出一些选项，在可以自己玩一下哟~

配置git
前提：打开自己的项目文件夹，右键点击Git Bash Here，在git命令行窗口下设置以下内容。
1.git全局设置：
git config --global user.name '你的名字'
git config --global user.email '你的邮箱'
作用：用来在git查看是谁提交的代码鸭~

2.创建SSH-keys：
cd ~/.ssh			(进入.ssh文件目录，将key放在这里。)
ssh-keygen -t rsa -C '你的邮箱'  （注意：-C是大写的，一路回车）
截图箭头就是保存你SSH-keys的位置。

在编辑器里打开id_rsa.pub文件全选复制到你的git里面添加SSH-keys



3.创建git仓库：
在你需要创建git的本地文件夹下，右击鼠标点击Git Bash Here，打开git命令行窗口。
git init  (注意：执行成功后，自己的项目文件夹会有一个隐藏的.git文件夹，这个就是本地仓库)
touch ReadMe.md   (也可以创建你想创建的文件内容)
git add ReadMe.md   (添加到git本地仓库)
git commit -m '我创建了一个md文件'  （提交备注，这是一个好习惯）
git remote add origin git@github.com:ITt-mac/demo.git  (红色部分用自己的git仓库地址，作用是连接线仓库)
git push -u origin master  （提交到你的线上仓库）


4.git 与vscode
当你完成上面步骤的时候，基本上vscode都能直接上传代码。具体的不细讲了。
5.关于tortoisegit，文中并没有讲到其与git关联的方法，值得一提的是tortoisegit生成的SSH-keys方法
   前面内容生成的不一致，具体可以查阅（https://blog.csdn.net/bendanbaichi1989/article/details/17916795）
文章都是大同小异的，主要是看自己怎么通过网络去查找学习内容，一个人是很局限的，文章也是，当你通过多篇文章对比，去学习就会发现，其实这些都不难。








