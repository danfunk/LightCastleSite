$(function() {

    var name = $( "#name" ),
        email = $( "#email" ),
        message = $( "#message" ),
        allFields = $( [] ).add( name ).add( email ).add( message ),
        tips = $( ".validateTips" );

    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
            o.addClass( "ui-state-error" );
            updateTips( "Length of " + n + " must be between " +
                min + " and " + max + "." );
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp( o, regexp, n ) {
        if ( !( regexp.test( o.val() ) ) ) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }

    $( "#contact-div" ).dialog({
        autoOpen: false,
        height: 500,
        width: 600,
        modal: true,
        buttons: {
            "Send an email": function() {
                var bValid = true;
                allFields.removeClass( "ui-state-error" );

                bValid = bValid && checkLength( name, "name", 3, 80 );
                bValid = bValid && checkLength( email, "email", 6, 80 );

                // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
                bValid = bValid && checkRegexp( message, /^(.){5,}$/, "Please enter a message." );

                if ( bValid ) {
                    var dataString = 'name='+ name + '&email=' + email + '&message=' + message;
                    $.ajax({
                        type: "POST",
                        url: "/application/sendMessage",
                        data: dataString,
                        success: function() {
                            $(":button:contains('Send an email')").attr("disabled","disabled").addClass("ui-state-disabled");
                            $('#contact-div').html("<div id='success_message'></div>");
                            $('#success_message').html("<h2>Thank you for contacting us.</h2>")
                                .append("<p>We will be in touch soon.</p>")
                                .hide()
                                .fadeIn(1500, function() {
                                    $('#success_message').append("<img id='checkmark' src='/public/images/check.png' />");
                                });
                        }
                    });
                    return false;


                    $( "#contact-form" ).submit();
                    $( this ).dialog( "close" );
                }
            },
            Close: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            allFields.val( "" ).removeClass( "ui-state-error" );
        }
    });


    $( ".contact" )
        .click(function() {
            $( "#contact-div" ).dialog( "open" );
        });

    $(".close").live('click', function() {
        $(".pop").slideFadeToggle(function() {
            $("#contact").removeClass("selected");
        });
        return false;
    });


});

