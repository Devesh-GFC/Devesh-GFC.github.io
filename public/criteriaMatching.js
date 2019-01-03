function matchingCriteria (e) {
    //Prevent Actual Submit
    e.preventDefault();

    // Getting the form values and Verifying the null values.

//     var candidate = document.getElementById("candidate_name").value;
    var initialsNumber = document.getElementById("initials_number").value;
    var withoutInitials = document.getElementById("without_initials").value;
    var typeMatch = document.getElementById("type_of_match").value;
    var selectState = document.getElementById("select_state").value;
    var selectDistricts = document.getElementById("select_districts").value;
    // alert(candidate + " " + initialsNumber + " " + withoutInitials + " " + typeMatch + " " + selectState + " " + selectDistricts);
    // console.log(candidate + " " + initialsNumber + " " + withoutInitials + " " + typeMatch + " " + selectState + " " + selectDistricts);

//     if (candidate == null || candidate == ""){
//       alert("Please Enter Candidate Name.");
//       return false;
//     }
//     else 
        if(initialsNumber == null || initialsNumber == ""){
      alert("Please Provide Number of Initials.");
      return false;
    }
    else if(withoutInitials == null || withoutInitials == ""){
      alert("Please Provide Number of Without Initials.");
      return false;
    }
    else if(typeMatch == "State" && selectState == "Select"){
      alert("Please Select State.");
      return false;
    }
    else if(typeMatch == "District" && (selectState == "Select" || selectDistricts == "Select") ){
      // if (selectState == "Select" || selectDistricts == "Select") {
        alert("Please Select State and District.");
        return false;
      // }
    }
    else if(typeMatch == "Pincode" && selectState == "Select"){
      alert("Please Select State.");
      return false;
    }
    else if(typeMatch == "Sub-Region" && selectState == "Select"){
      alert("Please Select State.");
      return false;
    }
    else{
      //alert("Data verified");
    }



    // Calculation of the Matching Percentage

    var matchingPercentage;
    var MatchingPopulation;

    for (var i = 0; i < StatePopulationMapping.length; i++) {
      if (StatePopulationMapping[i].StateName == selectState) {
        //console.log(StatePopulationMapping[i].Population);
        var statePopulation = StatePopulationMapping[i].Population;
        //alert(statePopulation);
        var formattedStatePopulation = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(statePopulation);
        //alert("The "+ selectState +" State Population is : " + statePopulation);
        //return;
      }       
    }

    for (var i = 0; i < DistrictPopulationMapping.length; i++) {
      if (DistrictPopulationMapping[i].DistrictName == selectDistricts) {
        //console.log(DistrictPopulationMapping[i].Population);
        var districtPopulation = DistrictPopulationMapping[i].Population;
        //alert(districtPopulation);
        var formattedDistrictPopulation = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(districtPopulation);
        //alert("The "+ selectDistricts +" District Population is : " + districtPopulation);
        //return;
      }       
    }

    if (withoutInitials == 0) {
      var WI = 1;
      //alert(WI);
    } else {
      try{
        WI = withoutInitials*Math.pow(1/20, initialsNumber);
        if (WI<1) {
          WI = 1;
        }
        //alert(WI);
      }catch(err){
        alert(err);
        console.log(err);
      }
    }

    if (typeMatch == "Country") {
      //alert ("No Match");
      //var NoMatchPopulation = 1200000000;
      if (withoutInitials == 0) {
        alert("Please Enter Correct Number of People.");
        return false;
      } else {
        MatchingPopulation = (1/withoutInitials)*100;
        // matchingPercentage = Math.round(MatchingPopulation) + "%";
        //alert(MatchingPopulation);
      }
    }
    else if (typeMatch == "State") {
      //alert("State");
        MatchingPopulation = (1/WI)*100;
        // matchingPercentage = Math.round(MatchingPopulation) + "%";
        //alert(MatchingPopulation);
    }
    else if (typeMatch == "District") {
      //alert("District");
      if (districtPopulation > 0) {
        MatchingPopulation = Math.pow((1-districtPopulation/statePopulation), (WI-1))*100;
        // matchingPercentage = Math.round(MatchingPopulation) + "%";
        //alert(MatchingPopulation);
      }
      else {
        alert("Please Enter Correct Value!");
        return false;
      }
    }
    else if (typeMatch == "Pincode") {
      //alert("Pincode");

      // Default Pincode value is 64000.
      pincodePopulation=64000;

      if (pincodePopulation > 0) {
        MatchingPopulation = Math.pow((1-pincodePopulation/statePopulation), (WI-1))*100;
        // matchingPercentage = Math.round(MatchingPopulation) + "%";
        //alert(MatchingPopulation);
      }
      else {
        alert("Please Enter Correct Value!");
        return false;
      }
    }
    else if (typeMatch == "Sub-Region") {
      //alert("Sub-Region");

      // Default Sub-Region value is 5000.
      sub_regionPopulation=5000;

      if (sub_regionPopulation > 0) {
        MatchingPopulation = Math.pow((1-sub_regionPopulation/statePopulation), (WI-1))*100;
        // matchingPercentage = Math.round(MatchingPopulation) + "%";
        //alert(MatchingPopulation);
      }
      else {
        alert("Please Enter Correct Value!");
        return false;
      }
    }
    else {
      alert("Cannot Found Data");
      return false;
    }
    // alert(MatchingPopulation);

    

    // function f_color() {
    //   alert("In f_color");
    //   document.getElementById("matchingPercentage_Output").style.backgroundColor = "green";
    //   $('#matchingPercentage_Output ul li').css('backgroundColor','green');
    //   alert("After Color");
    // }

    matchingPercentage = Math.round(MatchingPopulation) + "%";


    // Formatted Output

//     var candidateOutput = `
//        <ul class = "list-group">
//         <li class = "list-group-item"><strong>Candidate Name: </strong> ${candidate}</li>
//        </ul>
//       `;

    var initialsNumberOutput = `
       <ul class = "list-group">
        <li class = "list-group-item"><strong>Initials: </strong> ${initialsNumber}</li>
       </ul>
      `;

    var withoutInitialsOutput = `
       <ul class = "list-group">
        <li class = "list-group-item"><strong>Number of People: </strong> ${withoutInitials}</li>
       </ul>
      `;
    
    var typeMatchOutput = `
       <ul class = "list-group">
        <li class = "list-group-item"><strong>Type of Match: </strong> ${typeMatch}</li>
       </ul>
      `;
    
    var selectStateOutput = `
       <ul class = "list-group">
        <li class = "list-group-item"><strong>State Name: </strong> ${selectState}</li>
       </ul>
      `;
    
    var selectDistrictsOutput = `
       <ul class = "list-group">
        <li class = "list-group-item"><strong>District Name: </strong> ${selectDistricts}</li>
       </ul>
      `;
    
    var matchingPercentageOutput = `
       <ul class = "list-group">
        <li class = "list-group-item"><strong>Matching Percentage: </strong> ${matchingPercentage}</li>
       </ul>
      `;

    var statePopulationOutput = `
       <ul class = "list-group">
        <li class = "list-group-item"><strong>State Population: </strong> ${formattedStatePopulation}</li>
       </ul>
      `;
    
    var districtPopulationOutput = `
       <ul class = "list-group">
        <li class = "list-group-item"><strong>District Population: </strong> ${formattedDistrictPopulation}</li>
       </ul>
      `;
    
    

    //Output For Display

//     document.getElementById("candidate_Output").innerHTML = candidateOutput;
    document.getElementById("initialsNumber_Output").innerHTML = initialsNumberOutput;
    document.getElementById("withoutInitials_Output").innerHTML = withoutInitialsOutput;
    document.getElementById("typeMatch_Output").innerHTML = typeMatchOutput;
    document.getElementById("selectState_Output").innerHTML = selectStateOutput;
    document.getElementById("selectDistricts_Output").innerHTML = selectDistrictsOutput;
    document.getElementById("districtPopulation_Output").innerHTML = districtPopulationOutput;
    document.getElementById("statePopulation_Output").innerHTML = statePopulationOutput;
    document.getElementById("matchingPercentage_Output").innerHTML = matchingPercentageOutput;

    if(MatchingPopulation > 25){
      // alert('dfbhdbfdf');
     $('#matchingPercentage_Output ul li').css('background','red');
     // document.getElementById("matchingPercentage_Output ul li").style.backgroundColor = "green";
    }else{
      $('#matchingPercentage_Output ul li').css('background','green');
    }
  }
