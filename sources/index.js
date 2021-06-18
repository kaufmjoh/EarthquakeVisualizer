

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
  visualizePoint(["S", -90, 0]);
  visualizePoint(["E", 0, 90]);
  visualizePoint(["W", 0, -90]);
  //visualizePoint(["NN", 180, 0]);
  //visualizePoint(["NNN", 220, 0]);
  //visualizePoint(["NNN", 200, 0]);
}

function visualizePoint(point)
{
  console.log(point);
  
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
  
}

function latitudeToY(lat)
{
  var y = lat;
  
  y = y*3.88;
  console.log(3.88);
  
  y = y-1.5; //Puts the point on the x-axis
  
  y=y+350; //Put the point on the equator
  
  return y+"px";
}

function longitudeToX(longitude)
{
  var x = longitude;
  x = x+5; //Puts the point on the y-axis
  
  x=x+622; //Put the point on the prime meridian
  
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

