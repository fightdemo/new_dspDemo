<template>
    <div class="dropdown dropdown-date" ref="dropdowndate">
        <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">{{now}}</button>
        <span class="caret"></span>
        <ul class="dropdown-menu wr">
            <li v-if="hasAll" @click="selectDate($event,0)"><a href="javascript:;">全部时间段</a></li>
            <li @click="selectDate($event,1)"><a href="javascript:;">{{tody}}</a></li>
            <li @click="selectDate($event,2)"><a href="javascript:;">{{yesterday}}</a></li>
            <li @click="selectDate($event,3)"><a href="javascript:;">{{lastWeek}}</a></li>
            <li @click="selectDate($event,4)"><a href="javascript:;">{{lastTwo}}</a></li>
            <li class="li_time">
                <a href="javascript:;" class="cl">
                    <span class="fl"><input @click="calendar($event)" type="text" readonly="readonly" class="startTime" placeholder="选择开始时间..." /><i class="icon_time"></i></span>
                    <em class="fl">-</em>
                    <span class="fl"><input @click="calendar($event)" type="text" readonly="readonly" class="endTime" placeholder="选择结束时间..." /><i class="icon_time"></i></span>
                    <span class="fl"><input  @click="selectDate($event,5)" type="button" value="确认选择" class="affirm"/></span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import {Calendar} from '@/common/js/calendar.js'
import {getNowFormatDate, nextDayFnc, parseDate} from '@/common/js/utils.js'
export default {
    data() {
        return {
            hasAll: false,
            tody: "",
            now: "",
            yesterday: "",
            lastWeek: "",
            lastTwo: "",
        }
    },
    mounted() {
        this.initCalendar();

    },
    methods: {
        initCalendar(element) {
            this.hasAll = this.hasAll || false;
            var date = new Date();
            var lastWeek = new Date(date.getTime() - 6 * 24 * 3600 * 1000);
            var lastTwo = new Date(date.getTime() - 13 * 24 * 3600 * 1000);
            var tody = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            lastWeek = lastWeek.getFullYear() + "-" + (lastWeek.getMonth() + 1) + "-" + lastWeek.getDate();
            lastTwo = lastTwo.getFullYear() + "-" + (lastTwo.getMonth() + 1) + "-" + lastTwo.getDate();
            var yesterday = nextDayFnc(getNowFormatDate(), 1, 1);
            // 借用nextDayFnc方法将XXXX-X-X转化成XXXX-0X-0X格式
            tody = nextDayFnc(tody,0,1);
            lastWeek = nextDayFnc(lastWeek,0,1);
            lastTwo = nextDayFnc(lastTwo,0,1);
            this.tody = "今日："+parseDate(tody);
            this.now = this.hasAll?"全部时间段":this.tody;
            this.yesterday = "昨日：" + parseDate(yesterday);
            this.lastWeek = "最近7日：" + parseDate(lastWeek) + " — " + parseDate(tody);
            this.lastTwo = "最近14日：" + parseDate(lastTwo) + " — " + parseDate(tody);

            //隐藏时间控件
            $(document).click(function (event) {
                $("#__calendarPanel").css("visibility","hidden");
                $(".entrance").find("ul").hide();
                $(".scrollBar").hide();
                $(".entrance").removeClass("quick_active");
                $(".entrance").css({
                    "background": "url('images/index_btn_bg2.png') no-repeat",
                    "border-radius": "0px 0px 5px 5px"
                });
                $(".apps_logo").css("background", "url('images/index_app_icon.png') no-repeat");
                $(".small_font").parent().css("border-color", "#fff");
            });

            $(".startTime, .endTime").click(function (event) {
                event.stopPropagation();
            });

            
        },
        // 根据type判断选择的日期
        selectDate($event,type) {
            var start,end = this.tody;
            switch (type) {
                case 0:
                    this.now = "全部时间段";
                    start = end = "";
                    break;
                case 1:
                    // 今日
                    this.now = this.tody;
                    start = this.tody;
                    break;
                case 2:
                    // 昨日
                    this.now = this.yesterday;
                    start = end = this.yesterday;
                    break;
                case 3:
                    // 上周
                    this.now = this.lastWeek;
                    start = this.lastWeek;
                    break;
                case 4:
                    // 上两周
                    this.now = this.lastTwo;
                    start = this.lastTwo;
                    break;
                case 5:
                    // 自定义日期
                    // jQlite的find方法根据类名查找有bug,改用jquery
                    var $this = $(this.$refs.dropdowndate);
                    start = $this.find(".startTime").val(),
                    end = $this.find(".endTime").val();
                    
                    if(!start || !end) {
                        return
                        // return layer.msg("请先选择时间");
                    }
                    this.now = "时间为："+parseDate(start)+" — "+parseDate(end);
                    $this.removeClass("open");
                    break;
            }
            this.$emit( 'chooseDate', start )
        },
        calendar(e) {
            new Calendar().show(e.target);
        }
    }
}
</script>

<style lang="less">

</style>