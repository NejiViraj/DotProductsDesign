var scroll = 0
function scrollCSS() {
    scroll += 1;
    console.log(scroll);
}


function showRandom() {
    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    return "a" + randomString(71, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
};


function inner(title, description, type, temp_class = showRandom()) {
    // console.log(title, description, type);
    // var temp_class = showRandom();
    console.log(temp_class);
    var base_code = "" +
        '<div class="card-body" style="background-color: white; margin: 1rem;" id="' + temp_class + '"' +
        'onclick="ShowPopup(\'' + temp_class + '\', $(this).children(\'.title\').text(), $(this).children(\'.descriptions\').text(), $(this).children(\'.type\').text())">' +
        '<h5 class="card-title title">' +
        '<span>' + title + '</span>' +
        '</h5>' +
        '<p class="card-text descriptions">' +
        '<i>' + description +
        '</i>' +
        '</p>' +
        '<p class="type" style="display: none;">' + type + '</p>' +
        '</div>';
    return base_code
};

function putOrder() {
    if (localStorage["data"]) {
        var data = JSON.parse(localStorage["data"]);
        to_do_data = ""
        for (var i = 0; i < data["to_to"].length; i++) {
            to_do_data += inner(data["to_to"][i][0], data["to_to"][i][1], "to_do")
        };
        doing_data = ""
        for (var i = 0; i < data["doing"].length; i++) {
            doing_data += inner(data["doing"][i][0], data["doing"][i][1], "doing")
        };
        done_data = ""
        for (var i = 0; i < data["done"].length; i++) {
            done_data += inner(data["done"][i][0], data["done"][i][1], "done")
        };
        document.getElementById("done").innerHTML = done_data;
        document.getElementById("doing").innerHTML = doing_data;
        document.getElementById("to_do").innerHTML = to_do_data;
        data = "";
    }
}

function maintain_order() {
    // console.log("Hello World")
    var to_do = document.getElementById("to_do");
    var doing = document.getElementById("doing");
    var done = document.getElementById("done");


    var to_do_length = document.getElementById("to_do").getElementsByClassName("card-body");
    var doing_length = document.getElementById("doing").getElementsByClassName("card-body");
    var done_length = document.getElementById("done").getElementsByClassName("card-body");

    var data = {}
    data["to_to"] = [];
    for (var i = 0; i < to_do_length.length; i++) {
        data["to_to"].push([to_do_length[i].getElementsByClassName("title")[0].innerText, to_do_length[i].getElementsByClassName("descriptions")[0].innerText])
    }
    data["doing"] = [];
    for (var i = 0; i < doing_length.length; i++) {
        data["doing"].push([doing_length[i].getElementsByClassName("title")[0].innerText, doing_length[i].getElementsByClassName("descriptions")[0].innerText])
    }
    data["done"] = [];
    for (var i = 0; i < done_length.length; i++) {
        data["done"].push([done_length[i].getElementsByClassName("title")[0].innerText, done_length[i].getElementsByClassName("descriptions")[0].innerText])
    }
    console.log(data)
    var data = JSON.stringify(data);
    localStorage.setItem("data", data);
    data = "";
    putOrder();
}


window.onload = function () {
    putOrder();
};

dragula1 = dragula([
    document.getElementById("to_do"),
    document.getElementById("doing"),
    document.getElementById("done"),
]);

dragula1.on("drag", function (el) {
    el.className.replace("ex-moved", "");

})
dragula1.on("drop", function (el) {
    maintain_order()
    el.className += "ex-moved";

})
dragula1.on("over", function (el, container) {
    container.className += "ex-over";

})
dragula1.on("out", function (el, container) {
    container.className.replace("ex-over", "");
}
);


// $("#to_do .card-body, #doing .card-body, #done .card-body").click(function(this){
//     console.log(this.innerHTML);
// })


function AddNew() {
    var title_modal = document.getElementById("modal-title-control1").value;
    var desc_modal = document.getElementById("modal-description-controll1").value;
    var type_modal = document.getElementById("modal-type-controll1").textContent;
    console.log(title_modal, desc_modal, type_modal)
    // document.getElementById("modal-title-control1").value = "";
    // document.getElementById("modal-description-controll1").value = "";
    // document.getElementById("modal-type-controll1").textContent = "To do";
    if(!(title_modal && desc_modal)){alert("Please add content"); return 0}

    if (type_modal == "To do ") { type_modal = "to_do" };
    if (type_modal == "Doing ") { type_modal = "doing" };
    if (type_modal == "Done ") { type_modal = "done" };

    var original_html = inner(title_modal, desc_modal, type_modal);
    // if(type_modal=="to_do"){
    //     $("#to_do").append(original_html)
    // }else{
    //     $("#"+type_modal).append(original_html)
    // }
    $("#" + type_modal).append(original_html);
    maintain_order()
}


function SaveChange(id) {
    var title_modal = document.getElementById("modal-title-control").value;
    var desc_modal = document.getElementById("modal-description-controll").value;
    var type_modal = document.getElementById("modal-type-controll").textContent;
    if (!(desc_modal.length <= 25)) { alert("Description must have 25 letter"); return 0 }

    if(!(title_modal && desc_modal)){alert("Please add content")}

    if (type_modal == "To do") { type_modal = "to_do" };
    if (type_modal == "Doing") { type_modal = "doing" };
    if (type_modal == "Done") { type_modal = "done" };
    // console.log(title_modal, desc_modal, type_modal)
    var type = document.getElementById(id).getElementsByClassName("type")[0].textContent;
    if (type != type_modal) {
        // document.getElementById().outerHTML
        var original_html = inner(title_modal, desc_modal, type_modal, id);
        document.getElementById(id).outerHTML = "";
        if (type_modal == "to_do") {
            $("#to_do").append(original_html)
        } else {
            $("#" + type_modal).append(original_html)
        }
    }
    document.getElementById(id).outerHTML = inner(title_modal, desc_modal, type_modal, id);

    maintain_order();
}


function ShowPopup(id, title, description, type) {

    console.log(title, description, type, id);
    if (type == "") { type = "Dropdown" };
    if (type == "to_do") { type = "To do" };
    if (type == "doing") { type = "Doing" };
    if (type == "done") { type = "Done" };
    var data = '' +
        '<!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"> -->' +
        '<button id="temp_modal" style="display: none;" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">' +
        '    Launch demo modal' +
        '</button>' +
        '<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"' +
        '    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
        '    <div class="modal-dialog modal-dialog-centered" role="document">' +
        '        <div class="modal-content">' +
        '            <div class="modal-header">' +
        '                <input id="modal-title-control"  onchange="text_correct1(\'modal-title-control\')" onkeyup="text_correct(\'modal-title-control\')" value="' + title + '" type="text" placeholder="Put title here" style="color: rgb(0, 0, 0); width: 80%; margin-right: 10px;">' +
        '                <span>' +
        '' +
        '                    <div class="wrapper">' +
        '                        <button class="btn btn-outline-secondary dropdown-toggle" type="button"' +
        '                            data-bs-toggle="dropdown" aria-expanded="false"  data-toggle="dropdown" id="modal-type-controll">' + type + '</button>' +
        '                        <ul class="dropdown-menu" id="menu">' +
        '                            <li><a class="dropdown-item" onclick="$(\'#modal-type-controll\').text(\'To do\')">To do</a></li>' +
        '                            <li><a class="dropdown-item" onclick="$(\'#modal-type-controll\').text(\'Doing\')">Doing</a></li>' +
        '                            <li><a class="dropdown-item" onclick="$(\'#modal-type-controll\').text(\'Done\')">Done</a></li>' +
        '                        </ul>' +
        '                    </div>' +
        '' +
        '                </span>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <textarea class="form-control" placeholder="Content description here" rows="1" id="modal-description-controll" onkeyup="textarea_correct(\'modal-description-controll\')" maxlength="25">' + description + '</textarea>' +
        '            </div>' +
        '            <div class="modal-footer d-flex justify-content-between">' +
        '                <button type="button" class="btn btn-primary" onclick="SaveChange(\'' + id + '\')" data-dismiss="modal">Save</button>' +
        '                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'


    document.getElementById("temp").innerHTML = data;
    document.getElementById("temp_modal").click();



    // $(this).addClass(temp_class)

    // console.log(data)
};


// Auto scroll
autoScroll([
    window,
    document.querySelector("html"),
    document.querySelector("body"),
    document.querySelector("#to_do"),
    document.querySelector("#doing"),
    document.querySelector("#done"),
], {
    margin: 200,
    autoScroll: function () {
        return this.down && dragula1.dragging;
    }
});



$('.dropstart').click(function () {

    $('.dropdown-menu').toggleClass('show');

});


var scroll = $("body").scrollTop() + 5;
$("body").scroll(function (event) {
    // console.log(scroll)
    if (scroll < $("body").scrollTop()) {
        // $('.sidebar').hide(1000);
        document.getElementById("sidebar").style.left = "-75px";
        document.getElementById("top_navbar").style.top = "-" + $("#top_navbar").height() + "px";
    } else {
        // $('.sidebar').show(1000);
        document.getElementById("sidebar").style.left = "0px";
        document.getElementById("top_navbar").style.top = "0";
    }
});


function text_correct(id) {
    var val = $("#" + id).val();
    $("#" + id).keypress(function (e) {

        var keycode = (e.which) ? e.which : e.keyCode;
        if (!((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123))) {
            e.preventDefault();
        }
    });
}


function textarea_correct(id) {
    var data = $("#" + id).val();


    var val = $("#" + id).val();
    $("#" + id).keypress(function (e) {
        var keycode = (e.which) ? e.which : e.keyCode;
        if (((keycode == 13))) {
            e.preventDefault();
        }
    });

    if (data.length > 25) {
        document.getElementById(id).classList.add("error")
    } else {
        document.getElementById(id).classList.remove("error")
    }
}


// $('i').replaceWith( "<pre>" + $('i').text() + "</pre>" );

// for(var i=0; i<document.getElementsByTagName("i").length; i++){

// }

// $('textarea').on('keyup', function(){
//     // $(this).val($(this).val().replace(/[\r\n\t\v]+/g, ''));
//     console.log("123")
// })