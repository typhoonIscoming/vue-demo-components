<template>
    <div id="app">
        <div class="nav-bar">
            <router-link to="/A" @click.native="clickLink">A</router-link>
            <router-link to="/B" @click.native="clickLink">B</router-link>
            <router-link to="/C" @click.native="clickLink">C</router-link>
            <router-link to="/D" @click.native="clickLink">D</router-link>
            <router-link to="/E" @click.native="clickLink">E</router-link>
            <router-link to="/F" @click.native="clickLink">F</router-link>
            <router-link to="/G" @click.native="clickLink">G</router-link>
        </div>
        <transition :name="trsnsname">
            <router-view/>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            trsnsname: 'turn-on',
        };
    },
    methods: {
        clickLink() {
            this.trsnsname = 'turn-on';
        },
    },
    mounted() {
        const that = this;
        window.addEventListener('popstate', () => {
            that.trsnsname = 'turn-off';
        }, false);
    },
};
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.btn {
    width: 50%;
}
html,
body{
    height: 100%;
    width: 100%;
}
#app {
    height: 100%;
    position: relative;
    box-sizing: border-box;
}
.turn-on-enter {
    transform: translate3d(100%, 0, 0);
}
.turn-on-leave-to {
    transform: translate3d(-20%, 0, 0);
}
.turn-on-enter-active,
.turn-on-leave-active,
.turn-off-enter-active,
.turn-off-leave-active {
    transition: transform .4s ease;
}
.turn-off-enter {
    transform: translate3d(-20%, 0, 0);
}
.turn-off-leave-to {
    transform: translate3d(100%, 0, 0);
}
.turn-off-leave-active {
    z-index: 2;
}
.nav-bar {
    position: absolute;
    width: 100%;
    height: 40px;
    line-height: 40px;
    top: 0;
    background: white;
    display: flex;
    z-index: 100;
    a {
        flex: 1;
        text-align: center;
        // border-right: 1px solid gray;
        box-sizing: border-box;
        position: relative;
        text-decoration: none;
        &:after {
            content: "";
            border-right: 1px solid #666;
            height: 10px;
            width: 2px;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
        }
        &:last-child {
            &:after {
                border: none;
            }
        }
        &.is-active {
            color: red;
        }
    }
}
</style>
