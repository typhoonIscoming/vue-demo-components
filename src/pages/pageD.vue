<template>
    <div class="D common page-d-container">
        <common title="d"></common>
        <div class="content">
            <div id="container"></div>
        </div>
        <div class="bottom">D页面</div>
    </div>
</template>

<script>
import common from "@/components/common";
import G6 from '@antv/g6';

export default {
    data() {
        return {
            graph: null,
            initData: {
                nodes: [
                    { id: 'node1', label: 'Circle1', x: 150, y: 150 },
                    { id: 'node2', label: 'Circle2', x: 400, y: 150 }
                ],
                edges: [
                    { source: 'node1', target: 'node2' }
                ]
            }
        };
    },
    components: {
        common
    },
    created() {
        
    },
    mounted() {
        this.initG6()
    },
    methods: {
        initG6() {
            const width = document.getElementById('container').clientWidth;
            const height = document.getElementById('container').clientHeight;
            console.log(width, height)
            this.graph = new G6.Graph({
                container: 'container',
                width,
                height,
                defaultNode: {
                    shape: 'rect',
                    size: [ 100 ],
                    color: '#5B8FF9',
                    style: {
                    fill: '#9EC9FF',
                    lineWidth: 3
                    },
                    labelCfg: {
                    style: {
                        fill: '#fff',
                        fontSize: 20
                    }
                    }
                },
                defaultEdge: {
                    style: {
                    stroke: '#e2e2e2'
                    }
                }
            })
            this.graph.data(this.initData);
            this.graph.render();
            console.log(this.graph.getEdges())
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/css/common.scss";
.page-d-container{
    #container{
        width: 100%;
        height: 100%;
    }
}
</style>