===����GIT��Ŀ==

touch README.md 						//�½�˵���ļ�
git init 							//�ڵ�ǰ��ĿĿ¼�����ɱ���git����,������һ������.gitĿ¼
git add . 							//��ӵ�ǰĿ¼�е������ļ�������
git commit -m "first commit" 					//�ύ������Դ��⣬�������ύע��
git remote add origin http://www.xxx.Com/JosonJiang.Git		//��ӵ�Զ����Ŀ������Ϊ origin ճ�����Ƶĵ�ַ https://github.com/JosonJiang/XManages.git
git push -u origin master 					//�ѱ���Դ���push��github ����Ϊorigin��Զ����Ŀ�У�ȷ���ύ



===����GIT��Ŀ============================================================================================

cd ��Ŀ¼
git add .
git commit -m "update ������Ϣ" 				//����ļ��Ķ��������ύע��
git push -u origin master   					//�ύ�޸ĵ���Ŀ���� .����Ϊ origin


��������г��֡�please enter a commit message...��,����escȻ������   ��wq����



===���GIT��Ŀ�ļ����ļ���============================================================================================

cd ��Ŀ¼
git add *.txt
git commit -m "����ļ���ע��Ϣ" 				//����ļ��Ķ��������ύע��
git push -u origin master   					//�ύ�޸ĵ���Ŀ���� .����Ϊ origin


��������г��֡�please enter a commit message...��,����escȻ������   ��wq����




===ͬ������GIT��Ŀ=======================================================================================

��ȡԶ�̵�Repo�����أ�����Ѿ��ڱ��أ������Թ��� 
$ git clone https://github.com/JosonJiang/XManages.git

�ڱ��زֿ�ɾ���ļ� 
$ git rm �ҵ��ļ�

�ڱ��زֿ�ɾ���ļ��� 
$ git rm -r �ҵ��ļ���/

�˴�-r��ʾ�ݹ�������Ŀ¼�������Ҫɾ���ģ��ǿյ��ļ��У��˴����Բ��ô���-r��

�ύ���� 
$ git commit -m"�ҵ��޸�"

���͵�Զ�ֿ̲⣨����GitHub�� 
$ git push origin https://github.com/JosonJiang/XManages.git


============Git ɾ��Զ�ֿ̲��ļ�===========================================================================

ʹ�� git rm ����ɣ�������ѡ��.

һ���� git rm --cached "�ļ�·��"		��ɾ�������ļ����������ļ��ӻ�����ɾ����
һ���� git rm --f "�ļ�·��"			���������ļ��ӻ�����ɾ�������Ὣ�����ļ�ɾ����������յ�����Ͱ��



Git ���ɾ��Զ�̷������ļ�ͬʱ���������ļ�



1��ɾ��Զ��Joson.txt�ļ�,���ر���

git rm --cached Joson.txt
git commit -m "delete file"
git push

2��ɾ��Զ��bin�ļ���,���ر���
git rm --cached -r bin
git commit -m "delete directory"
git push

=========================���زֿ�����󶨵�Զ�ֿ̲�====================================================================




����һ ͨ������ֱ���޸�Զ�̵�ַ 

����git_test��Ŀ¼ 
git remote https://github.com/JosonJiang/XManages.git	�鿴����Զ�ֿ̲⣬ git remote XManages.git �鿴ָ��Զ�ֿ̲��ַ 
git remote set-url origin https://github.com/JosonJiang/JosonJiangXManages.git


������ ͨ��������ɾ�������Զ�ֿ̲� 

����git_test��Ŀ¼ 
git remote https://github.com/JosonJiang/XManages.git  �鿴����Զ�ֿ̲⣬ git remote XManages.git �鿴ָ��Զ�ֿ̲��ַ 
git remote rm origin 
git remote add origin https://github.com/JosonJiang/JosonJiangXManages.
git

������ ֱ���޸������ļ� .git/config













1��create a new repository on the command line

echo "# XManages" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/JosonJiang/XManages.git
git push -u origin master



2��push an existing repository from the command line

git remote add origin https://github.com/JosonJiang/XManages.git
git push -u origin master