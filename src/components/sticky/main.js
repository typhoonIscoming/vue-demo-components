// /* eslint-disable */
import {
    createNamespace, BindEventMixin, getScroller, isHidden,
    getScrollTop, getElementTop, isDef,
} from '../utils/browser';
import { unitToPx } from '../utils/unit';

const [createComponent, bem] = createNamespace('sticky');

export default createComponent({
    mixins: [
        BindEventMixin(function sticky(bind, isBind) {
            if (!this.scroller) {
                this.scroller = getScroller(this.$el);
            }
            // console.log('BindEventMixin', this.scroller)
            if (this.observer) {
                const method = isBind ? 'observe' : 'unobserve';
                this.observer[method](this.$el);
            }
            bind(this.scroller, 'scroll', () => {
                // console.log('bind', e)
                this.onScroll()
            }, true);
            this.onScroll();
        }),
    ],
    props: {
        zIndex: [Number, String],
        container: null,
        scroll: null,
        offsetTop: {
            type: [Number, String],
            default: 0,
        },
    },
    data() {
        return {
            fixed: false,
            height: 0,
            transform: 0,
        };
    },
    computed: {
        offsetTopPx() {
            return unitToPx(this.offsetTop);
        },
        style() {
            if (!this.fixed) {
                return;
            }
            const style = {};
            if (isDef(this.zIndex)) {
                style.zIndex = this.zIndex;
            }
            if (this.offsetTopPx && this.fixed) {
                style.top = `${this.offsetTopPx}px`;
            }

            if (this.transform) {
                style.transform = `translate3d(0, ${this.transform}px, 0)`;
            }
            return style;
        },
    },
    watch: {
        fixed(isFixed) {
            this.$emit('change', isFixed);
        },
    },
    created() {
        // compatibility: https://caniuse.com/#feat=intersectionobserver
        if (window.IntersectionObserver) {
            this.observer = new IntersectionObserver(
                (entries) => { // eslint-disable-line
                    // trigger scroll when visibility changed
                    // console.log('intersectionRatio', entries[0].intersectionRatio)
                    // if (entries[0].intersectionRatio > 0) {
                        this.onScroll();
                    // }
                    // console.log('created scroll', this.$el)
                },
                { root: this.scroll || document.body },
            );
        }
    },
    methods: {
        onScroll() {
            if (isHidden(this.$el)) {
                return;
            }
            this.height = this.$el.offsetHeight;
            const { container, offsetTopPx } = this;
            const scrollTop = getScrollTop(this.scroll || window);
            // console.log('scrollTop', scrollTop)
            // console.log('el', this.$el)
            // console.log('this.scroll', this.scroll)
            const topToPageTop = getElementTop(this.$el, this.scroll);
            const emitScrollEvent = () => {
                this.$emit('scroll', {
                    scrollTop,
                    isFixed: this.fixed,
                });
            };

            // The sticky component should be kept inside the container element
            if (container) {
                const bottomToPageTop = topToPageTop + container.offsetHeight;
                if (scrollTop + offsetTopPx + this.height > bottomToPageTop) {
                    const distanceToBottom =
                        this.height + scrollTop - bottomToPageTop;
                    if (distanceToBottom < this.height) {
                        this.fixed = true;
                        this.transform = -(distanceToBottom + offsetTopPx);
                    } else {
                        this.fixed = false;
                    }

                    emitScrollEvent();
                    return;
                }
            }
            if (scrollTop + offsetTopPx > topToPageTop) {
                this.fixed = true;
                this.transform = 0;
            } else {
                this.fixed = false;
            }
            emitScrollEvent();
        },
    },
    render() {
        const { fixed } = this;
        const style = {
            height: fixed ? `${this.height}px` : null,
        };
        // console.log('===', fixed);
        return (
            <div style={style}>
                <div class={bem({ fixed })} style={this.style}>{this.$slots.default}</div>
            </div>
        );
    },
})
