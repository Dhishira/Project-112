prediction_1 = "" ;

Webcam.set({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 90
});

camera = document.getElementById("camera") ;

Webcam.attach("#camera") ;

function take_snapshot()
{
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id="image" src="'+data_uri+'" width="250px" height="200px" />' ;
    });

}

console.log("ml5.version",ml5.version) ;
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/_dw3bOXFH/model.json",modelLoded)

function modelLoded()
{
    console.log("modelLoded") ;
}

function speak()
{
    var synth = window.speechSynthesis ;
    speak_data_1 = "prdicition 1 is "+prediction_1 ;
    speak_data_2 = "and prdicition 2 is "+prediction_2 ;
    var utter = new SpeechSynthesisUtterance (speak_data_1+speak_data_2) ;
    synth.speak(utter) ;
}

function predict()
{
    img = document.getElementById("image") ;
    classifier.classify(img,got_results)
}

function got_results(error,results)
{
    if(error)
    {
        console.error(error) ;
    }
    else
    {
        console.log(results) ;
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;

        if(results[0].label == "Best")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;" ;
        }
        if(results[0].label == "Amazing")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;" ;
        }
        if(results[0].label == "Victory")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;" ;
        }
    }
}