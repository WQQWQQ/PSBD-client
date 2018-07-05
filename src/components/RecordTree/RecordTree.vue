<style scoped lang="less" src="./RecordTree.less"></style>
<template>
    <Tree :data="treeData" @on-select-change="selectTreeNode" :render="renderContent"></Tree>
</template>
<script>
    import {
        deepCopy
    } from '@/services/utils';
    export default {
        name:'RecordTree',
        props:{
            data:{
                type:Array,
                default(){
                    return [];
                }
            },
            rootNodeImg:String,
            subNodeImg:String
        },
        data(){
            return {
                selectNodeTitle:'',
                hoverNodeTitle:'',
                selectFirstLeaf:true
            };
        },
        computed:{
            treeData(){
                let data = deepCopy(this.data);
                this.handleTreeData(data,true);
                return data;
            }
        },
        methods:{
            handleTreeData(data,isRoot){
                if(data && data.length){
                    for(let i of data){
                        let children=i.children;
                        i.expand=true;
                        i.isRoot=isRoot;
                        i.isLeaf=!!((!children || !children.length) && i.type);
                        if(this.selectFirstLeaf && i.isLeaf){
                            i.selected=true;
                            this.selectNodeTitle=i.title;
                            this.selectTreeNode(i);
                            this.selectFirstLeaf=false;
                        }
                        this.handleTreeData(children,false);
                    }
                }
            },
            selectTreeNode(nodes){
               nodes && this.$emit('select-tree-node',nodes[0] || nodes);
            },
            renderContent(h, { root, node, data }) {
                let { title, isRoot, isLeaf } = data;
                let img = isRoot ? this.rootNodeImg : this.subNodeImg;
                let background = isLeaf ? 'none' : `url("${img}") left center no-repeat`,
                    fontSize=isLeaf?'12px':'14px',
                    display=img?'inline-block':'none',
                    color=this.selectNodeTitle == title || this.hoverNodeTitle==title?'#0394f9':'#2b3646';
                return (
                    <span
                        onClick={()=>{this.selectTreeNode(data); this.selectNodeTitle = title;}}
                        onMouseover={()=>(this.hoverNodeTitle = title)}
                        onMouseout={()=>(this.hoverNodeTitle = '')}
                        class="tree-node-wrapper">
                            <span
                                class="tree-node-bg"
                                style={{backgroundColor:this.selectNodeTitle == title || this.hoverNodeTitle==title?'#d3ebff':'transparent'}}></span>
                            <span
                                class="tree-node-content"
                                style={{display,fontSize,background,color}}>{title}</span>
                    </span>
                );
            }

        }
    }
</script>