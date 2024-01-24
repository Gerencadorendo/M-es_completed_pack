previsao1=""
previsao2=""

Webcam.set({
    width:350,
    height:300,
    imageFormat:'png',
    pngQuality:90
});

camera=document.getElementById("camera")
Webcam.attach(camera)

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="foto" src="'+data_uri+'"/>'
    });
}

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/FEZkT7C4t/model.json',modelLoaded)

function modelLoaded(){
    console.log("funcionou")
}

function speak(){
    synth=window.speechSynthesis;
    prev1="A primeira previsão é "+previsao1
    prev2="Corrigido para "+previsao2
    utterThis=new SpeechSynthesisUtterance(prev1+prev2)
    synth.speak(utterThis)
}
function check(){
    img=document.getElementById("foto");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById("resultEmotionName").innerHTML=results[0].label
        document.getElementById("resultEmotionName2").innerHTML=results[1].label
        previsao1=results[0].label
        previsao2=results[1].label
        speak()

        if(results[0].label=="Ok"){
            document.getElementById("updateEmoji").innerHTML="&#128077;"
        }
        if(results[0].label=="Negativo"){
            document.getElementById("updateEmoji").innerHTML="&#128078;"
        }
        if(results[0].label=="Toca aqui"){
            document.getElementById("updateEmoji").innerHTML="&#128591;"
        }
        if(results[0].label=="Fundo"){
            document.getElementById("updateEmoji").innerHTML="&#128444;"
        }



        if(results[1].label=="Ok"){
            document.getElementById("updateEmoji2").innerHTML="&#128077;"
        }
        if(results[1].label=="Negativo"){
            document.getElementById("updateEmoji2").innerHTML="&#128078;"
        }
        if(results[1].label=="Toca aqui"){
            document.getElementById("updateEmoji2").innerHTML="&#128591;"
        }
        if(results[1].label=="Fundo"){
            document.getElementById("updateEmoji2").innerHTML="&#128444;"
        }
    }
}