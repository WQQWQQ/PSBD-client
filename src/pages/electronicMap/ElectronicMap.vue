<style scoped lang="less">
   @import url('http://172.16.16.109:8088/jsapi/3.14/dijit/themes/claro/claro.css');
   @import url('http://172.16.16.109:8088/jsapi/3.14/esri/css/esri.css');
    .electronicMap {
        height: 100%;
        overflow: hidden;
        position: relative;
        .layout-left {
            width: 300px;
            float: left;
            height: 100%;
        }
        .layout-right {
            margin-left: 300px;
            height: 100%;
            overflow: hidden;
            position: relative;
            .ivu-btn-group {
                position: absolute;
                right:0;
            }
            .mapWrapper {
                height: 100%;
                padding-top: 36px;
                #map {
                    height: 100%;
                    width: 100%;
                }
            }
        }
    }

</style>
<template>
    <div class="electronicMap">
        <div class="layout-left">
        </div>
        <div class="layout-right">
            <ButtonGroup size="large">
                <Button type="ghost" @click.native="measureLength" icon="ios-color-wand-outline">测距</Button>
                <Button type="ghost" @click.native="measureArea" icon="ios-sunny-outline">测面</Button>
            </ButtonGroup>
            <div class="mapWrapper">
                <div id="map"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import esriLoader from 'esri-loader';
    // import GisObject from '../../services/gis';
    export default {
        data() {
            return {
                btnGroup: [{}, {

                }],
                GisObject: null
            }
        },
        mounted() {
            esriLoader.loadModules(["dojo/ready", "extras/MapInitObject"], dojoConfig)
                .then(([ready, MapInitObject]) => {
                    ready(() => {
                        this.GisObject = new MapInitObject("map", {
                            basemapToggle: true,
                            coordinate: true,
                            minZoom: 1,
                            nav: false
                        });
                        this.GisObject.addDefaultLayers();
                        this.GisObject.addScalebar();

                        this.GisObject.map.centerAndZoom(113, 23);
                    });
                })
                .catch(err => {
                });

        },
        methods: {
            measureLength() {
                this.GisObject && this.GisObject.toolbar.measureLength();
            },
            measureArea() {
                this.GisObject && this.GisObject.toolbar.measureArea();
            }
        }
    }

</script>
