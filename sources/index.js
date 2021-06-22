

console.log("Hello world!");

var create = document.getElementById("create");
create.addEventListener("click", createVisual);

var start_date = document.getElementById("start_date");
var sd_val;

var end_date = document.getElementById("end_date");
var ed_val;

var low_mag = document.getElementById("low_mag");
var lm_val;

var up_mag = document.getElementById("up_mag");
var um_val;

var low_depth = document.getElementById("low_depth");
var ld_val;

var up_depth = document.getElementById("up_depth");
var ud_val;

var lines = [];

function createVisual()
{
  updateInputValues();

  //alert(lines[5829]);
  
  console.log(lines.length);
  console.log(sd_val, ed_val, lm_val, um_val, ld_val, ud_val);
  
  var data_point;
  
  visualizeCorners();
  
  
  //for(var i = 0; i < lines.length; i++)
  //{
    data_point = lines[0];
    //test
    if(validPoint(data_point))
    {
      console.log("true");
      //visualizePoint(data_point);
    }
    else
    {
      console.log("false");
    }
  //}
  
}

function visualizeCorners()
{
  visualizePoint(["Center", 0, 0]);
  visualizePoint(["N", 90, 0]);
  //visualizePoint(["NN", 55, 0]);
  //visualizePoint(["NNN", 35, 0]);
  //visualizePoint(["NNN", 25, 0]);
  
  visualizePoint(["S", -90, 0]);
  
  //visualizePoint(["E", 0, 90]);
  visualizePoint(["EE", 0, 180]);
  
  //visualizePoint(["W", 0, -90]);
  visualizePoint(["WW", 0, -180]);


  visualizePoint(["Sicily", 37.37, 14.21]);
  visualizePoint(["Taranto Gulf", 39.809, 17.354]);
  visualizePoint(["Black Sea", 45.1975, 34.205])
  visualizePoint(["NE Australia", -15.725, 143.11]);
  visualizePoint(["SA Island", -51.98758, -59.328451]);
  visualizePoint(["Tip of Brazil", -5.178482, -35.451003]);
  visualizePoint(["Lake Chad", -1.01069, 32.866082]);
  visualizePoint(["Gulf of California", 30.4411, -113.912]);
  visualizePoint(["Northern NZ", -38.918394,175.970113]);
  visualizePoint(["Lake Michigan", 42.365038,-87.134498]);
  visualizePoint(["Far East Russia", 61.325107,161.171887]);
  visualizePoint(["Indian Island", 7.519341,80.654884]);
  visualizePoint(["Hawaii", 19.559790,-155.499443]);
  visualizePoint(["Alaskan Island", 57.364459,-153.554059]);
  visualizePoint(["South Alaska", 60.274693,-150.088919]);
  visualizePoint(["Canadian Island", 53.183656,-132.262189]);
  visualizePoint(["Pacific Island", -17.853290,178.005414]);
  visualizePoint(["Indian Ocean Island", -49.382369,69.388931]);
  visualizePoint(["Somalia", 11.764117,51.231800]);
  visualizePoint(["Montevideo", -35.542954,-56.332415]);
  visualizePoint(["Western SA", -18.371208,-70.382681]);
  visualizePoint(["Antarctica S of NZ", -71.875377,170.917079]);
  visualizePoint(["Antarctica S of SA", -63.257366,-55.844015]);
  visualizePoint(["Horn of SA", -54.866490,-64.995081]);
  visualizePoint(["Strait of Gibraltar", 35.934430,-5.592593]); 
  visualizePoint(["Ireland", 53.215243,-7.944558]);
  visualizePoint(["Iceland", 64.744145,-18.364378]);
  visualizePoint(["Puerto Rico", 18.225177,-66.494519]);
  visualizePoint(["Galapagos", -0.395506,-90.744981]);
  visualizePoint(["South Korea", 36.173357,128.021359]);
  visualizePoint(["Taiwan", 23.845650,121.051490]);
  visualizePoint(["Tasmania", -42.208991,146.774359]);
  visualizePoint(["Borneo", 0.747049,114.194231]);


}

function visualizePoint(point)
{
  //console.log(point[0]);
  
  var y = latitudeToY(point[1]);
  var x = longitudeToX(point[2]);
  
  var dot = document.createElement("div");
  dot.classList.add("earthquake");
  
  var Map = document.getElementsByClassName("map_container");
  
  //console.log(Map[0]);
  
  Map[0].appendChild(dot);
  
  //console.log(x, y);
    
  
  dot.style.bottom=y;
  dot.style.left=x;
  
  dot.addEventListener("mouseover", function() {
                                                  showEqDetails(point[0], y, x);
                                                });
    
  dot.addEventListener("mouseout", hideEqDetails);
}

function showEqDetails(name, y, x)
{
  //Create a popup that displays information about the earthquake
  var text = document.createTextNode(name);
  var newP = document.createElement("p");
  newP.appendChild(text);
  var popUp = document.createElement("div");
  popUp.appendChild(newP);
  
  popUp.classList.add("popUp");

  var Map = document.getElementsByClassName("map_container");
  Map[0].appendChild(popUp);
  
  
  popUp.style.bottom=y;
  popUp.style.left=x;
}

function hideEqDetails()
{
  var dot = document.getElementsByClassName("popUp");
  dot[0].parentNode.removeChild(dot[0]);
}


function latitudeToY(lat)
{
  var y = lat;
  
  if(lat > 75){y = y*4.05;}
  else if(lat > 60){y=y*4.09;}
  else if(lat > 30){y=y*4.12;}
  else if(lat > 20){y=y*4.25;}
  else if(lat > 15){y=y*4.3;}
  else if(lat > 10){y=y*4.38;}
  else if(lat > 0){y=y*4.5}
  else if(lat > -30){y=y*4.1;}
  else if(lat > -60){y=y*4.116;}
  else if(lat > -80){y=y*4.05;}
  else{y=y*3.685;}

  
  y = y-1.5; //Puts the point on the x-axis
  
  y=y+334; //Put the point on the equator
  
  return y+"px";
}

function longitudeToX(longitude)
{
  var x = longitude;
  
  //if(longitude > 120){x=x*4.125;}
  if(longitude > 130){x=x*4.135;}
  else if(longitude > 95){x=x*4.125;}
  else if(longitude > 60){x=x*4.15;}
  else if(longitude > 0){x=x*4.207;}
  else if(longitude > -30){x=x*3.7;}
  else if(longitude > -40){x=x*3.96;}
  else if(longitude > -60){x=x*4.07;}
  else if(longitude > -120){x=x*4.08;}
  else{x=x*4.09;}
  
  x = x+5; //Puts the point on the y-axis
  
  x=x+738; //Put the point on the prime meridian
  
  return x+"px";
}



//Once this function is confirmed to be successfully working, simply plug it in, as it is only a 1-line function.
function validPoint(point)
{    
  //console.log(point);

  if(point[0] < sd_val || point[0] > ed_val || point[3] < lm_val || point[3] > um_val || point[4] < ld_val || point[4] > ud_val) {return false;}
  else{return true;}
}

function dateToInt(date)
{

  var year = parseInt(date.substring(0,4));
  var month = parseInt(date.substring(5,7));
  var day = parseInt(date.substring(8,10));
  
  var date_as_int = year*10000 + month*100 + day;
  if(year < 0) {date_as_int = date_as_int*-1;}

  return date_as_int;

}

function updateInputValues()
{
  //Figure out how to handle default values. Automatically parse as ints?
  if(start_date.value == ""){sd_val=-10000000;}
  else{sd_val = dateToInt(start_date.value);}
    
  if(end_date.value == ""){ed_val=21000101;}
  else{ed_val = dateToInt(end_date.value);}
    
  if(low_mag.value == ""){lm_val=-10;}
  else{lm_val = parseFloat(low_mag.value);}
    
  if(up_mag.value == ""){um_val=20;}
  else{um_val = parseFloat(up_mag.value);}
    
  if(low_depth.value == ""){ld_val=-10;}
  else{ld_val = parseFloat(low_depth.value);}
     
  if(up_depth.value == ""){ud_val=10000;}
  else{ud_val = parseFloat(up_depth.value);}

}

//Read in data from the csv data source using JQUery
$(document).ready(function() 
{
    $.ajax({
        type: "GET",
        url: "./sources/eq.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
     
});

function processData(allText) 
{    
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');

    //For each data point in the dataset
    for (var i=1; i<allTextLines.length; i++) 
    {
      //Get a data point
      var data = allTextLines[i].split(',');
            
      if (data.length == headers.length) 
      {
        var tarr = [];
        
        //For each dimension
        for (var j=0; j<headers.length; j++) 
        {
          if(j==0)
          {
            tarr.push(dateToInt(data[j].substring(0,10))); //Only get the year, month, and date of the eq
          }
          else
          {
            tarr.push(parseFloat(data[j]));
          }
          //tarr.push(headers[j]+":"+data[j]);
        }
        lines.push(tarr);
      }
      
    }
}


