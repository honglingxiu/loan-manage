<template>
    <div>
        <Header />
        <transition name="move" mode="out-in">
            <!-- <keep-alive> -->
                <router-view></router-view>
            <!-- </keep-alive> -->
        </transition>
    </div>
</template>

<script>
import Header from "./header";
export default {
    components: {
        Header
    }
};
</script>