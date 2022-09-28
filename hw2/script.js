var n_stu = 6;
var has_pin = true;
var pin_id = 0;
if (!DOMTokenList.prototype.last){
    DOMTokenList.prototype.last = function(){
        return this[this.length - 1];
    };
};
(()=>{
    function starttime(){
        var date = new Date();
        var time = (date.getHours()>=12 ? "下午" : "上午")+ date.getHours()%12 + ":" + date.getMinutes();
        document.querySelectorAll('.meet_time>p')[0].innerHTML = time+" | fsq-gsws-gme";
    }
    var current_time = setInterval(starttime(), 1000);
})();

function Student (appear, id, innerHtml, color, stuname){
    this.appear = appear
    this.stu_idx = id
    this.innerHtml = innerHtml
    this.color = color
    this.name = stuname
}
var all_stu =[
    new Student(true, "0",'<div class="side-circle"> 羿成 </div>', "#0097a7", "我"),
    new Student(true, "1",'<img class="window_img" src="./img/ty.jpg" alt="陳廷瑜">', "#D29382", "陳廷瑜"),
    new Student(true, "2",'<img class="window_img" src="./img/wei.jpg" alt="Weiweihuang">', "#AA99B0", "Weiweihuang"),
    new Student(true, "3",'<img class="window_img" src="./img/lee.jpg" alt="李直謙">', "#7B8CDE", "李直謙"),
    new Student(true, "4",'<div class="side-circle"> KL </div>', "#5C6BC0", "Kf Liu"),
    new Student(true, "5",'<div class="side-circle"> JS </div>', "#b22e5b", "Judy Shih"),
    new Student(false, "6",'<div class="side-circle"> LC </div>', "#8E7C93", "Leyna Chen"),
    new Student(false, "7",'<div class="side-circle"> 彥蓁 </div>', "#F6C0D0", "彥蓁"),
    new Student(false, "8",'<div class="side-circle"> 政楷 </div>', "#6B0504", "賴政楷"),
    new Student(false, "9",'<div class="side-circle"> 爍靈 </div>', "#A3320B", "爍靈"),
    new Student(false, "10",'<div class="side-circle"> SL </div>', "#E6AF2E", "Sean Lin"),
    new Student(false, "11",'<img class="window_img" src="./img/chun.jpg" alt="陳子鈞">', "#B38281", "陳子鈞"),
    new Student(false, "12",'<img class="window_img" src="./img/kuo.jpg" alt="郭">', "#729B79", "郭瑋喆"),
    new Student(false, "13",'<div class="side-circle"> S </div>', "#BACDB0", "Sandy"),
    new Student(false, "14",'<div class="side-circle"> 義隆 </div>', "#5c6bc0", "陳義隆"),
]
var side_arr = all_stu.slice(1, 6)
document.addEventListener("click", handle_transition)

function handle_transition(e){
    const windowHtml =`
            <div class="meet_window" stu_idx="2">
                <div class="meet_mute">
                    <i class="material-symbols-outlined fill md-light cancel_icon">cancel</i>
                    <button type="submit" class="mute_btn"> <i class="material-symbols-outlined fill mute_icon">mic_off</i></button>
                </div>
                <div class="meet_name_circle">
                    <div class="side-circle"> 羿成 </div>
                </div>
                <div class="meet_name">
                    Weiweihuang
                </div>
                <div class="meet_hover-box">
                    <i class="material-symbols-outlined hover-icon">push_pin</i>
                    <i class="material-symbols-outlined hover-icon">grid_view</i>
                    <i class="material-symbols-outlined hover-icon">close_fullscreen</i>
                </div>
            </div>`
    function set_window( element , id ){
        element.children[1].innerHTML = all_stu[id].innerHtml
        element.children[2].innerHTML = all_stu[id].name
        element.setAttribute("stu_idx", id)
        if (element.children[1].innerHTML.slice(1,4)=="div"){
            element.children[1].children[0].style.backgroundColor = all_stu[id].color
            element.children[1].children[0].style.border = "2px solid "+all_stu[id].color
        }
    }
    function align_pinned(){
        if (side_arr.length <= 2){
            for (var i = 0; i < side_arr.length ; i++){
                document.getElementById("meet_col-2").children[i].style.width = "95%"
                document.getElementById("meet_col-2").children[i].style.height = "45%"
            }
        }
        else if (side_arr.length == 3){
            for (var i = 0; i < side_arr.length ; i++){
                document.getElementById("meet_col-2").children[i].style.width = "80%"
                document.getElementById("meet_col-2").children[i].style.height = "36%"
            }
        }
        else if (side_arr.length <= 6){
            for (var i = 0; i < side_arr.length ; i++){
                document.getElementById("meet_col-2").children[i].style.width = "47%"
                document.getElementById("meet_col-2").children[i].style.height = "34%"
                if( side_arr.length == 5 && i == 4){
                    document.getElementById("meet_col-2").children[i].style.width = "55%"
                }
            }
        }
        else if (side_arr.length <= 8){
            for (var i = 0; i < side_arr.length ; i++){
                document.getElementById("meet_col-2").children[i].style.display = "block"
                document.getElementById("meet_col-2").children[i].style.width = "47%"
                document.getElementById("meet_col-2").children[i].style.height = "24%"
                if( side_arr.length == 7 && i == 6){
                    document.getElementById("meet_col-2").children[i].style.width = "55%"
                }
            }
            document.getElementById("other_user").style.visibility = "hidden"
        }
        else{
            for (var i = 0; i < side_arr.length ; i++){
                document.getElementById("meet_col-2").children[i].style.display = "block"
                document.getElementById("meet_col-2").children[i].style.width = "47%"
                document.getElementById("meet_col-2").children[i].style.height = "24%"
                if( i > 7 ){
                    document.getElementById("meet_col-2").children[i].style.display = "none"
                }
            }
            document.getElementById("other_user").style.visibility = "visible"
            document.getElementById("other_user").innerHTML= `<p>和其他${side_arr.length-8}人</p>`
            console.log(side_arr.length)
        }
    }
    function align_unpinned(){
        document.getElementById("other_user").style.visibility = "hidden"
        if (side_arr.length == 1){
            document.getElementById("meet_col-2").children[0].style.width = "90%"
            document.getElementById("meet_col-2").children[0].style.height = "110%"
        }
        else if(side_arr.length == 2){
            for (var i = 0; i < side_arr.length ; i++){
                document.getElementById("meet_col-2").children[i].style.width = "45%"
                document.getElementById("meet_col-2").children[i].style.height = "80%"
            }
        }
        else if (side_arr.length == 3){
            for (var i = 0; i < side_arr.length ; i++){
                document.getElementById("meet_col-2").children[i].style.width = "31%"
                document.getElementById("meet_col-2").children[i].style.height = "50%"
            }
        }
        else if (side_arr.length == 4){
            for (var i = 0; i < side_arr.length ; i++){
                document.getElementById("meet_col-2").children[i].style.width = "40%"
                document.getElementById("meet_col-2").children[i].style.height = "55%"
            }
        }
        else if (side_arr.length <= 6){
            for (var i = 0; i < side_arr.length ; i++){
                document.getElementById("meet_col-2").children[i].style.width = "30%"
                document.getElementById("meet_col-2").children[i].style.height = "55%"
                if (side_arr.length == 5 && i>2){
                    document.getElementById("meet_col-2").children[i].style.width = "35%"
                }
            }
        }
        else if (side_arr.length <= 8){
            for (var i = 0; i < side_arr.length ; i++){
                document.getElementById("meet_col-2").children[i].style.width = "23%"
                document.getElementById("meet_col-2").children[i].style.height = "45%"
                if (side_arr.length == 7 && i>3){
                    document.getElementById("meet_col-2").children[i].style.width = "27%"
                }
            }            
        }
        else if (side_arr.length <= 12){
            for (var i = 0; i < side_arr.length ; i++){
                document.getElementById("meet_col-2").children[i].style.width = "22%"
                document.getElementById("meet_col-2").children[i].style.height = "35%"
                if ( i>=(side_arr.length-9)*4){
                    document.getElementById("meet_col-2").children[i].style.width = "26%"
                }
            }
        }
        else if (side_arr.length <= 15){
            for (var i = 0; i < side_arr.length ; i++){
                document.getElementById("meet_col-2").children[i].style.width = "18%"
                document.getElementById("meet_col-2").children[i].style.height = "32%"
                if ( i> (side_arr.length-12)*5-1 ){
                    document.getElementById("meet_col-2").children[i].style.width = "23%"
                }
            }
        }
    }
    //Target is the hover-box
    var target = e.target
    if (e.target.classList[0]=="meet_hover-box" || e.target.classList.last()=="hover-icon"){
        if (e.target.classList.last()=="hover-icon"){
            target = e.target.parentElement
        }
        if (has_pin){                                    // If there is pinned window
            if (target.parentElement.getAttribute("stu_idx")==pin_id){  // The clicked icon is at main window
                document.getElementById("meet_person-1").style.width="0%"
                document.getElementById("meet_person-1").style.visibility="hidden"
                document.getElementById("meet_col-2").style.width="100%"
                has_pin = false
                side_arr.push(all_stu[pin_id])
                var newDiv = document.createElement("div");
                newDiv.innerHTML = windowHtml
                newDiv.classList.add("meet_person-2")
                set_window(newDiv.children[0], pin_id)
                newDiv.children[0].children[0].style.visibility="hidden" // remove 我's cancel button
                document.getElementById("meet_col-2").insertBefore(newDiv, null)
                align_unpinned()
            }
            else{                                       //The clicked icon is not at main window
                var tmp = pin_id
                pin_id = target.parentElement.getAttribute("stu_idx")
                set_window(target.parentElement, tmp)
                set_window(document.getElementById("meet_person-1").children[0], pin_id)
                document.getElementById("meet_person-1").children[0].children[1].children[0].style.width="120px"
                document.getElementById("meet_person-1").children[0].children[1].children[0].style.height="120px"
                document.getElementById("meet_person-1").children[0].children[1].children[0].style.lineHeight="120px"
                document.getElementById("meet_person-1").children[0].children[1].children[0].style.fontSize="50px"
                if (pin_id == 0){
                    target.parentElement.children[0].children[0].style.visibility="visible"
                    document.getElementById("meet_person-1").children[0].children[0].children[0].style.visibility="hidden"
                }
                else if (tmp == 0){
                    target.parentElement.children[0].children[0].style.visibility="hidden"
                    document.getElementById("meet_person-1").children[0].children[0].children[0].style.visibility="visible"
                }
            }                                        
        }
        else{                                           //There is no pinned window
            has_pin=true
            enlarged_idx = target.parentElement.getAttribute("stu_idx")
            pin_id = enlarged_idx
            document.getElementById("meet_person-1").style.width="65%"
            document.getElementById("meet_person-1").style.visibility="visible"
            document.getElementById("meet_col-2").style.width="30%"
            var idx_to_del = side_arr.findIndex(object => {
                return object.stu_idx === enlarged_idx;
            });
            side_arr.splice(idx_to_del, 1);
            target.parentElement.parentElement.remove()
            set_window(document.getElementById("meet_person-1").children[0], enlarged_idx)
            document.getElementById("meet_person-1").children[0].children[1].children[0].style.width="120px"
            document.getElementById("meet_person-1").children[0].children[1].children[0].style.height="120px"
            document.getElementById("meet_person-1").children[0].children[1].children[0].style.lineHeight="120px"
            document.getElementById("meet_person-1").children[0].children[1].children[0].style.fontSize="50px"
            document.getElementById("meet_person-1").children[0].children[0].children[0].style.visibility="visible"
            align_pinned()
        }
    }
    else if(target.classList.last()=="cancel_icon"){
        var cancel_idx = target.parentElement.parentElement.getAttribute("stu_idx")
        all_stu[cancel_idx].appear = false
        if (has_pin && cancel_idx==pin_id){
            //Shrink the main window and become unpinned
            has_pin = false
            document.getElementById("meet_person-1").style.width="0%"
            document.getElementById("meet_person-1").style.visibility="hidden"
            document.getElementById("meet_col-2").style.width="100%"
            align_unpinned()
        }
        else{
            // Delete the item from side array
            var idx_to_del = side_arr.findIndex(object => {
                return object.stu_idx === cancel_idx;
            });
            side_arr.splice(idx_to_del, 1)
            target.parentElement.parentElement.parentElement.remove()
            if (has_pin){
                // all the user at side bar are deleted
                if (side_arr.length == 0){
                    document.getElementById("meet_person-1").style.width = "95%"
                    document.getElementById("meet_person-1").style.height = "85%"
                }
                align_pinned()
            }
            else{
                align_unpinned()
            }
        }
        n_stu -= 1
    }
    else if(target.id=="add"){
        n_stu += 1
        var add_idx = -1
        //find the first student not appear on meet
        for(var j=1 ; j<15 ; j++){
            if (all_stu[j].appear == false){
                add_idx = j
                break
            }
        }
        all_stu[add_idx].appear = true
        side_arr.push(all_stu[add_idx])
        var newDiv = document.createElement("div")
        newDiv.innerHTML = windowHtml
        newDiv.classList.add("meet_person-2")
        set_window(newDiv.children[0], add_idx)
        document.getElementById("meet_col-2").insertBefore(newDiv, null)
        if (has_pin){
            align_pinned()
        }
        else{
            align_unpinned()
        }
    }
}
