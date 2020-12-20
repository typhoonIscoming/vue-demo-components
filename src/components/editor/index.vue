
<script>
import throttle from 'lodash/throttle'
// import { debounce } from '@/utils/debounce';
import { getScrollTop, getVisibleTop, getVisibleHeight } from '@/utils/scroller';

export default {
    name: 'TseEditor',
    data() {
        return {}
    },
    props: {
        setting: {
            type: Object,
            default: () => {},
        },
    },
    beforeMount() {
        const setting = Object.assign({}, this.setting);
        this.editor = window.tinymce.createEditor('tse-editor-container', setting)
    },
    mounted() {
        this.editor.targetElm = this.$el
        this.editor.render()
    },
    render() {
        return (
            <div
                class="tse-editor-container"
                {
                    ...{
                        directives: [
                            {
                                name: 'vEditorStick',
                                value: this.editorStick,
                                modifiers: {
                                    sticky: this.setting.toolbar_sticky,
                                },
                            },
                        ],
                    }
                }
            >
            </div>
        )
    },
    updated() {
        this.editor.render()
    },
    beforeDestroy() {
        this.editor.remove();
    },
    directives: {
        vEditorStick: {
            // bind: (el, binding, vnode, oldVnode) => {
            //     console.log(el, binding, vnode, oldVnode)
            //     console.log('parent', el.parentNode)
            // },
            inserted(el, binding) {
                console.log('this.setting', binding)
                const { modifiers } = binding
                if (modifiers.sticky) {
                    const parent = el.parentNode;
                    const header = document.getElementsByClassName('tox-editor-header');
                    const headerContent = document.getElementsByClassName('tox-toolbar-overlord');
                    const scrollHandler = () => {
                        const scrollTop = getScrollTop(parent)
                        const visiableTop = getVisibleTop(parent)
                        const headerHeight = getVisibleHeight(headerContent[0])
                        // const styles = window.getComputedStyle(parent)
                        // console.log('parent', scrollTop, visiableTop, headerHeight)
                        if (scrollTop > 0) {
                            header[0].style.paddingTop = `${headerHeight}px`
                            headerContent[0].style.borderTop = '1px solid #ccc'
                            headerContent[0].style.position = 'fixed';
                            headerContent[0].style.top = `${visiableTop}px`;
                        } else {
                            header[0].style.paddingTop = 0
                            headerContent[0].style.position = 'initial';
                            headerContent[0].style.borderTop = 'initial'
                        }
                    }
                    const fn = throttle(scrollHandler)
                    parent.addEventListener('scroll', () => fn())
                }
            },
            componentUpdated() {

            },
            unbind(el) {
                if (el.parentNode) el.parentNode.removeEventListener('scroll', () => {})
            },
        },
    },
}
</script>
<style lang='scss' scoped>
.tse-editor-container{
    width: 100%;
    min-height: 300px;
}
</style>
