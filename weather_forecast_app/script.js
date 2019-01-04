    
    // this converts the coolected data to celcius
    function toCelsius(temp){
        temp = (temp-273.15).toFixed(2); 
        return temp + "°C";              
    }
    
                        
            // let i  = 0;
            // let j = 0;
            // while( i<5){    
            //     while( j< 39){
            //         j+= 8
            //         break;
            //     }    
            //     console.log(i,j)
            //     i++;
            // }
  

    //when the document is ready
$(document).ready(function(){    
    //on click , this collects the value of the selscted city
        $("button").click(function(){
            let city_id = 0;
            let city_choice = document.getElementById("city").value;
            loadWeather(city_choice, 0);
            //and passes it as an arguement to the load weather method
        });

        let i  = 0;
        let j = 0;
         //this function does all the calling and getting of data from the API
        function loadWeather(id ,i,j){

         //this function converts the default time collected from the api 
         //to standard time
            function timeConverter(timestamp){
                var a = new Date(timestamp * 1000);
                var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var time = month + ' ' + date  + ' ' + year + "\n " + hour +" : " + min +"0";
                return time;
                
            }
         //this is the api , address , it changes based on tje value of the city chosen , 
         //the value is inserted inbetween the link so as to get the appropriate response            
        let city_address = "https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&appid=f2bbebdb7dbe908785d6bb1e8f33794f"
            var xhr = new XMLHttpRequest();
            
            //  requesting for the Data
            xhr.open('GET', city_address, true);
        
            xhr.onload = function(){
                    if (this.status == 200){

                            let weath = JSON.parse(this.responseText);                  
                            //converts the temperature ..
                            let temperature = weath.list[i].main.temp
                            let tempCelsius = toCelsius(temperature);
                            let realTime = weath.list[i].dt;
                            //these pass the data parsed ti the DOM
                            document.getElementById('city_selected').innerHTML =  (weath.city.name)+ ", "+ (weath.city.country);
                            document.querySelector('.pressure-main').innerHTML= "Pressure: " + (weath.list[i].main.pressure) + 'mb';    
                            document.querySelectorAll('.timespace')[j].innerHTML = (timeConverter(realTime));
                            document.querySelectorAll('.description-main')[j].innerHTML= weath.list[i].weather[0].description;
                            document.querySelectorAll('.temperature-main')[j].innerHTML ="Temp: " +(tempCelsius);
                            document.querySelectorAll('.wind-main')[j].innerHTML = "Wind: " + (weath.list[i].wind.speed);
                            document.querySelectorAll('.humidity-main')[j].innerHTML= "Humidity: " +(weath.list[i].main.humidity) + "%";
                                
                }
            }
        
        xhr.send();
        
        }   
        //this increments the data fetched by 8 values 
        // and it also  switches the position it enters in the DOM
        //k switches betweeen the positions the data enters and p 
        // switches the data to be picked 
        var p = 0
        for (let k = 0; k < 5; k++) {
            loadWeather(2332459,p,k )
            p+=8
        };                  
    
       
});
// this is for the clock
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;
//this calls the clock function every second so as to keep the clock ticking
setInterval(drawClock, 1000);

function drawClock() {
	ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height); // x, y, w, h
	
    drawFace( radius);
    //this draws ht small tround do in between
	function drawFace( radius) {
		ctx.beginPath();
		ctx.arc(0, 0, 8, 0, 2 * Math.PI);
		ctx.fillStyle = "#000000";
		ctx.fill();
	}
	function drawFont() {
        // this draws the values , by placing them on coordinates 
        //on the canvas
		ctx.font = "30px Arial";
		ctx.fillText("12", -17, -140);
		ctx.font = "30px Arial ";
		ctx.fillText("3", 140, 10);
		ctx.font = "30px Arial";
		ctx.fillText("6", -17, 160);
		ctx.font = "30px Arial";
		ctx.fillText("9", -160, 10);
		drawFace();
	}
	function drawHands(length, width, color, ang) {
        ctx.save();
        //this draws one hand of the clock , so it can be modded to 
        //make any kind of hand using the agrs 
		let deg = Math.PI / 180;
		ctx.rotate(ang);
		ctx.moveTo(0, 22);
		ctx.strokeStyle = color;
		ctx.lineWidth = width;
		ctx.lineTo(0, length);
		ctx.lineCap = "round";
		ctx.stroke();
		ctx.restore();
		drawFont();
    }
    //this function is fot eh shadow of the second hand 
    function drawHandsh(length, width, color, ang) {
		ctx.save();
		let deg = Math.PI / 180;
		ctx.rotate(ang);
		ctx.moveTo(-2   , 22);
		ctx.strokeStyle = color;
		ctx.lineWidth = width;
		ctx.lineTo(0, length);
		ctx.lineCap = "round";
		ctx.stroke();
		ctx.restore();
		drawFont();
    }
    //this gets the actual time to make the clock move 
    //by the mins , secs , and hours 
	function getTime() {
		var now = new Date();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		// console.log( hour+'::'+ minute + ': '+ second)
        //this converts the time gotten above to suitable degrees to make the
        //clock hands rotate
		var hours =
			hour * Math.PI / 6 +
			minute * Math.PI / (6 * 60) +
			second * Math.PI / (360 * 60);
        let  minutes =
             minute = minute * Math.PI / 30 + second * Math.PI / (30 * 60)
        let seconds = second * Math.PI / 30;
        let secs = seconds-0.035;
        //These draw the hr , min and second hands respectively
		drawHands(-90, 5, 'black', hours);
		drawHands(-120, 4, 'black', minutes);
        drawHands(-150, 2, "red", seconds);
        //this draws the shadow of the seconds hand.
        drawHandsh(-130, 2, "lightgray", secs);	
    }
    
    getTime();
    
}

