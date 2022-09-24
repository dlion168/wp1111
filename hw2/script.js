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
    new Student(true, "6",'<div class="side-circle"> LC </div>', "#8E7C93", "Leyna Chen"),
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
                    <button type="submit" class="mute_btn"> <i class="material-symbols-outlined fill mute_icon">mic_off</i>
                </div>
                <div class="meet_name_circle">
                    <img class="window_img" src="./img/wei.jpg" alt="Weiweihuang">
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
        console.log(element, id)
        element.children[1].innerHTML = all_stu[id].innerHTML
        console.log(element.children[1])
        element.children[2].innerHTML = all_stu[id].name
        element.setAttribute("stu_idx", id)
        if (element.children[1].innerHTML.slice(1,4)=="div"){
            element.children[1].children[0].style.backgroundColor = all_stu[id].color
            element.children[1].children[0].style.border = "2px solid "+all_stu[id].color
        }
    }
    var target = e.target
    console.log(target)
    if (e.target.classList[0]=="meet_hover-box" || e.target.classList.last()=="hover-icon"){
        if (e.target.classList.last()=="hover-icon"){
            target = e.target.parentElement
        }
        console.log("detected !")
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
                console.log(pin_id)
                set_window(newDiv.children[0], pin_id)
                document.getElementById("meet_col-2").insertBefore(newDiv, null)
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
            target.parentElement.remove()
            set_window(document.getElementById("meet_person-1").children[0], enlarged_idx)
        }
    }
    else if(target.classList.last()=="cancel_icon"){
        var cancel_idx = target.parentElement.getAttribute("stu_idx")
        if (cancel_idx==pin_id){
            //Shrink the main window
            has_pin = false
            document.getElementById("meet_person-1").style.width="0%"
            document.getElementById("meet_person-1").style.visibility="hidden"
            document.getElementById("meet_col-2").style.width="100%"
        }
        else{
            // Delete the item from side array
            var idx_to_del = side_arr.findIndex(object => {
                return object.stu_idx === cancel_idx;
            });
            side_arr.splice(idx_to_del, 1);
            target.parentElement.parentElement.parentElement.remove()
        }
    }
}
