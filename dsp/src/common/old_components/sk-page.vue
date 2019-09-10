<template>
    <div class="pagination-wrap-sk">
        <div class="pagination cl">
            <span class="l">
                <button class="btn btn-prev-first btn-quickprev-disabled" v-if="nPage.currentPage == 1">首页</button>                
                <button class="btn btn-prev-first btn-quickprev"  @click="quickprev" v-else>首页</button>                
                <button class="btn btn-prev-top btn-prev-disabled" v-if="nPage.currentPage == 1">上一页</button>
                <button class="btn btn-prev-top btn-prev" v-else @click="prev">上一页</button>
            </span>

            <ul class="pager cl">
                <li :class="{ 'active': nPage.currentPage == 1 }"
                    v-if="totalPages > 0"
                    @click="changeCurrentPage(1)"
                    class="number">1
                </li>
                <li class="number" v-if="showPrevMore">...</li>
                <li v-for="pager in pagers"
                    :key="pager"
                    :class="{ 'active': nPage.currentPage == pager }"
                    @click="changeCurrentPage(pager)"
                    class="number">{{ pager }}
                </li>
                <li class="number" v-if="showNextMore">...</li>
                <li :class="{ 'active': nPage.currentPage == totalPages }"
                    class="number"
                    @click="changeCurrentPage(totalPages)"
                    v-if="totalPages > 1">{{ totalPages }}
                </li>
            </ul>

            <span class="r">
                <button class="btn btn-prev-first btn-next" @click="next" v-if="nPage.currentPage < totalPages">下一页</button>
                <button class="btn btn-prev-first btn-next-disabled" v-if="nPage.currentPage == totalPages">下一页</button>
                <button class="btn btn-prev-top btn-quicknext" @click="quicknext" v-if="nPage.currentPage < totalPages">末页</button>
                <button class="btn btn-prev-top btn-quicknext-disabled" v-if="nPage.currentPage == totalPages">末页</button>
                <select name="" id="" class="pagination_sizes" @change="changeSizes" v-model="sizes">
                    <option :value="item" v-for="item in pageSizes" :key="item">每页展示{{item}}条/页</option>
                </select>
            </span>
            
        </div>
    </div>
</template>

<script>
/**
 * pageSizes下拉展示条数列表
 * page对象包含：当前页，当前页条数，总条数
 * pagerCount自定义超过Number条显示省略号
 */
export default {
    data() {
        return {
            nPage: this.page,
            sizes: this.pageSizes[0],
            showPrevMore: false,
            showNextMore: false,
        }
    },
    props: {
        pageSizes: {
            type: Array,
            default: () => ["20", "50", "100"]
        },
        page: {
            type: Object,
            default: () => {
                return {
                    currentPage: 1,
                    size: 20,
                    total: 0
                };
            }
        },
        pagerCount: {
            type: Number,
            validator(value) {
                return (value | 0) === value && value > 4 && value < 22 && (value % 2) === 1;
            },
            default: 5
        },
    },
    computed: {
        totalPages() {
            return Math.ceil(this.page.total / this.page.size) || 1;
        },
       
        pagers() {
            const pagerCount = this.pagerCount;
            const halfPagerCount = (pagerCount - 1) / 2;

            const currentPage = Number(this.nPage.currentPage);
            const pageCount = Number(this.totalPages);

            let showPrevMore = false;
            let showNextMore = false;

            if (pageCount > pagerCount) {
                if (currentPage > pagerCount - halfPagerCount) {
                    showPrevMore = true;
                }

                if (currentPage < pageCount - halfPagerCount) {
                    showNextMore = true;
                }
            }

            const array = [];

            if (showPrevMore && !showNextMore) {
                const startPage = pageCount - (pagerCount - 2);
                for (let i = startPage; i < pageCount; i++) {
                    array.push(i);
                }
            } else if (!showPrevMore && showNextMore) {
                for (let i = 2; i < pagerCount; i++) {
                    array.push(i);
                }
            } else if (showPrevMore && showNextMore) {
                const offset = Math.floor(pagerCount / 2) - 1;
                for (let i = currentPage - offset ; i <= currentPage + offset; i++) {
                    array.push(i);
                }
            } else {
                for (let i = 2; i < pageCount; i++) {
                    array.push(i);
                }
            }

            this.showPrevMore = showPrevMore;
            this.showNextMore = showNextMore;

            return array;
        }
  
    },
    mounted() {
        
    },
    methods: {
        prev() {
            if(this.nPage.currentPage > 1) {
                this.nPage.currentPage--;
                this.change()
            }
        },
        next() {
            if(this.nPage.currentPage < this.totalPages) {
                this.nPage.currentPage++;
                this.change()
            }
        },
        quickprev() {
            if(this.nPage.currentPage == 1) return;
            this.nPage.currentPage = 1;
            this.change()
        },
        quicknext() {
            if(this.nPage.currentPage == this.totalPages) return;
            this.nPage.currentPage = this.totalPages;
            this.change()
        },
        changeCurrentPage(currentPage) {
            this.nPage.currentPage = currentPage;
            this.change()
        },
        changeSizes() {
            this.nPage.currentPage = 1;
            this.nPage.size = Number(this.sizes);
            this.change()
        },
        change() {
            this.$emit("update:page", this.nPage);
            this.$emit("change", this.nPage);
        },
    }
}
</script>

<style lang="less">
</style>
