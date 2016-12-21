
function browserAlert(headerMain,headerTitle,alertText) {
	$("#alertHeaderMain").text(headerMain);
	//$("#alertHeaderTitle").text(headerTitle);
	$("#alertText").text(alertText);
	$("#browserAlertSimple").popup('open');
}

var browserAlertInputOK=false;

function browserAlertInput(alertText,fn,headerTitle,ignore,defaultText) {
	$("#alertHeaderMainInput").text(headerTitle);
	//$("#alertHeaderTitleInput").text(headerTitle);
	$("#alertTextInput").text(alertText);
	$("#browserAlertInputText").val(defaultText);
	$("#browserAlertInputText").attr("placeholder", defaultText);
	browserAlertInputOK=false;

	// bit of a faff as if popups are chained that doesnt work well
	$("#browserAlertInputOk").click(function() {
		var result = {buttonIndex:"OK" , input1:$("#browserAlertInputText").val()};
		browserAlertInputOK=true;
		} ) ;
	$( "#browserAlertInput" ).popup({
  		afterclose: function( event, ui ) {
			if ( browserAlertInputOK == true )  {
				var result = {buttonIndex:1 , input1:$("#browserAlertInputText").val()};
				fn( result );
			} else {
				var result = {buttonIndex:2 , input1:null};
				fn( result );
			}
			browserAlertInputOK=false;
		}
	});
	$("#browserAlertInput").popup('open');
}
