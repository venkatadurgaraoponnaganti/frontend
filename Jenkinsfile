pipeline{
agent any
environment{
	username="pvdr8978"
	password="PVdr@8978"
	image="frontend"
}
stages{	
	stage('checkout'){
		steps{
		git branch : 'master',
			url:'https://github.com/venkatadurgaraoponnaganti/frontend'
}}
stage('builld'){
		steps{
		sh '''
                  docker build -t "$username"/"$image" .
			'''
}}
stage('deploy'){
	steps{  
     sh '''
	echo "$password" | docker login -u "$username" --password-stdin
		docker push "$username"/"$image"
		'''
}}}
post{
  success{
 echo 'sucessfull'
}
failure{
 echo 'pipelin failed'
}}}
