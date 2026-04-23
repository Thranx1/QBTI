class QBTIEngine {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.questions = [];
        this.personalities = [];
        this.dimensions = {};
        this.init();
    }

    init() {
        this.loadQuestions();
        this.loadPersonalities();
        this.initDimensions();
    }

    initDimensions() {
        this.dimensions = {
            'M1': { name: '自我稳定度', score: 0, category: '金钱自我' },
            'M2': { name: '金钱认同', score: 0, category: '金钱自我' },
            'M3': { name: '核心执念', score: 0, category: '金钱自我' },
            'E1': { name: '焦虑型消费', score: 0, category: '情感消费' },
            'E2': { name: '投入程度', score: 0, category: '情感消费' },
            'E3': { name: '独立空间', score: 0, category: '情感消费' },
            'A1': { name: '规则观', score: 0, category: '金钱态度' },
            'A2': { name: '风险观', score: 0, category: '金钱态度' },
            'A3': { name: '意义观', score: 0, category: '金钱态度' },
            'Ac1': { name: '进攻/规避', score: 0, category: '行动驱力' },
            'Ac2': { name: '决策速度', score: 0, category: '行动驱力' },
            'Ac3': { name: '落地能力', score: 0, category: '行动驱力' },
            'So1': { name: '主动谈钱', score: 0, category: '金钱社交' },
            'So2': { name: '边界感', score: 0, category: '金钱社交' },
            'So3': { name: '真实度', score: 0, category: '金钱社交' }
        };
    }

    loadQuestions() {
        this.questions = [
            {
                id: 1,
                text: "发工资的那一刻，你通常的第一反应是？",
                options: [
                    { text: "立刻转进储蓄账户/理财", dimensions: { M1: 2, A1: 2, Ac1: -1 } },
                    { text: "先还信用卡/花呗", dimensions: { M1: 1, A1: 1, Ac3: 1 } },
                    { text: "先奖励自己买点什么", dimensions: { E1: 1, Ac2: 1 } },
                    { text: "看看余额，然后该干嘛干嘛", dimensions: { M1: 0, A3: 0 } }
                ]
            },
            {
                id: 2,
                text: "朋友找你借钱，你的第一反应是？",
                options: [
                    { text: "直接借，金额不大就别问了", dimensions: { So1: 2, So2: -1 } },
                    { text: "问清楚用途再决定", dimensions: { So1: 1, So2: 1, Ac2: 1 } },
                    { text: "委婉拒绝或找借口", dimensions: { So1: -1, So2: 2 } },
                    { text: "看关系远近，熟人可以借", dimensions: { So1: 0, So2: 0, E2: 1 } }
                ]
            },
            {
                id: 3,
                text: "看到「限时优惠」「最后3小时」，你会？",
                options: [
                    { text: "立刻下单，错过等一年！", dimensions: { Ac1: 2, Ac2: 2, E1: 1 } },
                    { text: "先加购物车冷静一下", dimensions: { Ac1: 0, Ac2: 0, M1: 1 } },
                    { text: "查查历史价格是不是真便宜", dimensions: { Ac1: -1, Ac2: -1, M1: 2 } },
                    { text: "完全无感，优惠与我无关", dimensions: { Ac1: -2, E1: -1 } }
                ]
            },
            {
                id: 4,
                text: "你觉得自己是个会花钱的人吗？",
                options: [
                    { text: "非常会，每分钱都花在刀刃上", dimensions: { M1: 2, A3: 1 } },
                    { text: "还行吧，不乱花也不抠门", dimensions: { M1: 1, A3: 0 } },
                    { text: "说实话，经常冲动消费", dimensions: { M1: -1, E1: 2, Ac2: 1 } },
                    { text: "我根本不知道钱花哪了...", dimensions: { M1: -2, A1: -1 } }
                ]
            },
            {
                id: 5,
                text: "关于记账这件事，你的态度是？",
                options: [
                    { text: "每天必记，一分钱都不能漏", dimensions: { A1: 2, M1: 2, Ac3: 2 } },
                    { text: "大概记一下，差不多就行", dimensions: { A1: 1, M1: 1 } },
                    { text: "想起来了才记，经常忘了", dimensions: { A1: 0, Ac3: -1 } },
                    { text: "从来不记，太麻烦了", dimensions: { A1: -2, Ac3: -2 } }
                ]
            },
            {
                id: 6,
                text: "如果突然有10万块额外收入，你会？",
                options: [
                    { text: "全部存起来/投资，不动它", dimensions: { M2: 2, A2: -1, Ac1: -1 } },
                    { text: "大部分存起来，小部分犒劳自己", dimensions: { M2: 1, A2: 0, E3: 1 } },
                    { text: "先买个想了很久的大件", dimensions: { M2: -1, E1: 1, Ac2: 1 } },
                    { text: "旅游！必须去旅游！", dimensions: { M2: -2, E2: 2, A3: 1 } }
                ]
            },
            {
                id: 7,
                text: "面对「高风险高收益」的投资机会，你会？",
                options: [
                    { text: "冲！富贵险中求！", dimensions: { A2: 2, Ac1: 2, Ac2: 2 } },
                    { text: "投一小部分试试水", dimensions: { A2: 1, Ac1: 0, M1: 1 } },
                    { text: "看看再说，多了解了解", dimensions: { A2: 0, Ac2: -1, M1: 1 } },
                    { text: "绝不碰，保本最重要", dimensions: { A2: -2, Ac1: -2, M3: 2 } }
                ]
            },
            {
                id: 8,
                text: "你觉得钱对你来说意味着什么？",
                options: [
                    { text: "安全感，有钱心里才踏实", dimensions: { A3: 2, M2: 2, M3: 1 } },
                    { text: "工具，用来实现想要的生活", dimensions: { A3: 0, M2: 0 } },
                    { text: "自由，有钱才能做自己", dimensions: { A3: 1, E3: 2, So3: 1 } },
                    { text: "数字而已，够用就好", dimensions: { A3: -1, M2: -1 } }
                ]
            },
            {
                id: 9,
                text: "和朋友出去吃饭，结账时通常会？",
                options: [
                    { text: "主动买单，不好意思AA", dimensions: { So1: -1, So2: -2, E2: 2 } },
                    { text: "提议AA，大家都不容易", dimensions: { So1: 1, So2: 2, A1: 1 } },
                    { text: "看情况，有时请客有时AA", dimensions: { So1: 0, So2: 0, E2: 1 } },
                    { text: "假装没看见，等人付完说谢谢", dimensions: { So1: -2, So2: 1, So3: -1 } }
                ]
            },
            {
                id: 10,
                text: "你有没有过「月光」的经历？",
                options: [
                    { text: "从来没有，我存钱很厉害", dimensions: { M1: 2, Ac3: 2, A1: 1 } },
                    { text: "偶尔一次，特殊情况", dimensions: { M1: 0, E1: 1 } },
                    { text: "经常月光，控制不住", dimensions: { M1: -2, E1: 2, Ac3: -2 } },
                    { text: "不仅月光，还负债中...", dimensions: { M1: -3, E1: 3, Ac3: -3 } }
                ]
            },
            {
                id: 11,
                text: "网购时，你会货比三家吗？",
                options: [
                    { text: "至少比3家，还要看评价", dimensions: { Ac2: -2, M1: 2, A1: 1 } },
                    { text: "简单对比一下，差不多的选便宜的", dimensions: { Ac2: -1, M1: 1 } },
                    { text: "看眼缘，喜欢就买了", dimensions: { Ac2: 2, E1: 1 } },
                    { text: "只认准一家店/一个品牌", dimensions: { Ac2: 0, M2: 0 } }
                ]
            },
            {
                id: 12,
                text: "关于「预算」这个概念，你是？",
                options: [
                    { text: "每月都有详细预算，严格执行", dimensions: { A1: 2, Ac3: 2, M3: 2 } },
                    { text: "大概有个数，不超太多就行", dimensions: { A1: 1, M3: 1 } },
                    { text: "预算是什么？能吃吗？", dimensions: { A1: -2, Ac3: -2 } },
                    { text: "有预算但经常超支...", dimensions: { A1: 0, Ac3: -1, E1: 1 } }
                ]
            },
            {
                id: 13,
                text: "看到别人晒奢侈品/高端消费，你的感受是？",
                options: [
                    { text: "羡慕！我也想拥有！", dimensions: { M2: -1, E1: 1, So3: -1 } },
                    { text: "无所谓，每个人生活方式不同", dimensions: { M2: 0, A3: 1, So3: 1 } },
                    { text: "觉得没必要，性价比更重要", dimensions: { M1: 1, A3: 0 } },
                    { text: "怀疑是不是装逼/借钱买的", dimensions: { So3: -1, M1: 0 } }
                ]
            },
            {
                id: 14,
                text: "如果有稳定的 passive income（被动收入），你会？",
                options: [
                    { text: "继续工作，把钱都存起来", dimensions: { M2: 2, A2: -1, Ac1: -1 } },
                    { text: "减少工作时间，享受生活", dimensions: { A3: 1, E3: 2, Ac1: 0 } },
                    { text: "辞职！自由万岁！", dimensions: { A3: 2, E3: 3, Ac1: 1 } },
                    { text: "投更多项目，让被动收入翻倍", dimensions: { A2: 1, Ac1: 2, M2: 1 } }
                ]
            },
            {
                id: 15,
                text: "你觉得自己现在的财务状况如何？",
                options: [
                    { text: "非常好，有存款有投资", dimensions: { M1: 2, M2: 1, A1: 1 } },
                    { text: "还可以，勉强过得去", dimensions: { M1: 1, M2: 0 } },
                    { text: "一般般，月光或者微存", dimensions: { M1: 0, E1: 1 } },
                    { text: "不太好，有点压力", dimensions: { M1: -1, E1: 2, A3: -1 } }
                ]
            },
            {
                id: 16,
                text: "关于「砍价」这件事，你的态度是？",
                options: [
                    { text: "必须砍！不砍觉得亏了", dimensions: { Ac1: 1, M1: 1, So1: 1 } },
                    { text: "看场合，合适就砍一下", dimensions: { Ac1: 0, So1: 0 } },
                    { text: "不好意思开口，标价多少给多少", dimensions: { Ac1: -1, So1: -1, So2: 1 } },
                    { text: "从不砍价，浪费时间", dimensions: { Ac1: -2, So1: -1, Ac2: -1 } }
                ]
            },
            {
                id: 17,
                text: "你会在朋友圈/社交媒体晒消费吗？",
                options: [
                    { text: "经常晒，好东西要分享", dimensions: { So3: -1, M2: -1, E2: 1 } },
                    { text: "偶尔晒，特别满意的才发", dimensions: { So3: 0, E2: 0 } },
                    { text: "基本不晒，比较低调", dimensions: { So3: 1, M2: 1 } },
                    { text: "从不晒，财不外露", dimensions: { So3: 2, M2: 2, So2: 2 } }
                ]
            },
            {
                id: 18,
                text: "面对「会员卡/储值卡」的推销，你会？",
                options: [
                    { text: "办！折扣力度大就值了", dimensions: { Ac2: 1, E1: 1, A1: -1 } },
                    { text: "考虑一下，算划不划算", dimensions: { Ac2: 0, M1: 1 } },
                    { text: "一般不办，怕被套住", dimensions: { Ac2: -1, M1: 1, A1: 1 } },
                    { text: "绝对不办，都是套路", dimensions: { Ac2: -2, M1: 2, A1: 2 } }
                ]
            },
            {
                id: 19,
                text: "如果你的投资亏损了20%，你会？",
                options: [
                    { text: "立刻割肉止损，不能亏更多", dimensions: { A2: -2, Ac2: 2, Ac1: -1 } },
                    { text: "持有观望，长期应该会回来", dimensions: { A2: 0, Ac2: -1, M1: 1 } },
                    { text: "加仓摊低成本！", dimensions: { A2: 2, Ac1: 2, Ac2: 2 } },
                    { text: "再也不碰投资了...", dimensions: { A2: -3, M3: 2, Ac1: -2 } }
                ]
            },
            {
                id: 20,
                text: "你觉得「省钱」和「赚钱」哪个更重要？",
                options: [
                    { text: "省钱！省到就是赚到", dimensions: { M1: 2, A1: 2, Ac1: -1 } },
                    { text: "赚钱！开源比节流重要", dimensions: { Ac1: 2, A3: 1, M2: 0 } },
                    { text: "两者平衡，都要做好", dimensions: { M1: 1, Ac1: 1, A3: 0 } },
                    { text: "看阶段，现在更需要哪个做哪个", dimensions: { M1: 0, Ac1: 0, A3: 1 } }
                ]
            },
            {
                id: 21,
                text: "关于「红包」文化，你的态度是？",
                options: [
                    { text: "大方给，人情往来不能少", dimensions: { E2: 2, So2: -1, A1: -1 } },
                    { text: "按标准来，不多不少", dimensions: { E2: 1, So2: 1, A1: 1 } },
                    { text: "能少给就少给，心疼", dimensions: { E2: -1, So2: 2, M1: 1 } },
                    { text: "尽量避开这种场合...", dimensions: { E2: -2, So1: -1, So2: 2 } }
                ]
            },
            {
                id: 22,
                text: "你有做过详细的理财规划吗？（如养老、购房基金）",
                options: [
                    { text: "有，而且一直在执行", dimensions: { A1: 2, Ac3: 2, M1: 2 } },
                    { text: "有规划但执行得一般", dimensions: { A1: 1, Ac3: 0, M1: 1 } },
                    { text: "想过但还没开始", dimensions: { A1: 0, Ac3: -1, M1: 0 } },
                    { text: "完全没有，走一步看一步", dimensions: { A1: -2, Ac3: -2, M1: -1 } }
                ]
            },
            {
                id: 23,
                text: "购物时，品牌对你的影响大吗？",
                options: [
                    { text: "很大！只买知名品牌", dimensions: { M2: -1, E2: 1, So3: -1 } },
                    { text: "有一定影响，但更看重质量", dimensions: { M2: 0, M1: 1 } },
                    { text: "影响不大，性价比优先", dimensions: { M1: 2, A3: 0 } },
                    { text: "完全不在意品牌", dimensions: { M1: 1, A3: 1, So3: 1 } }
                ]
            },
            {
                id: 24,
                text: "如果明天就要还一大笔钱（房贷/车贷/借款），你会？",
                options: [
                    { text: "早就准备好了，淡定", dimensions: { M1: 2, Ac3: 2, A1: 2 } },
                    { text: "凑一凑应该没问题", dimensions: { M1: 1, Ac3: 1 } },
                    { text: "有点紧张，得想办法", dimensions: { M1: -1, E1: 2, A3: -1 } },
                    { text: "完了...这下怎么办", dimensions: { M1: -2, E1: 3, A3: -2 } }
                ]
            },
            {
                id: 25,
                text: "你觉得自己在金钱方面最大的问题是？",
                options: [
                    { text: "太保守，不敢花钱也不敢投资", dimensions: { A2: -2, Ac1: -2, M3: 2 } },
                    { text: "太冲动，控制不住消费欲望", dimensions: { E1: 2, Ac2: 2, Ac3: -2 } },
                    { text: "太纠结，想太多反而错过机会", dimensions: { Ac2: -2, M1: 1, A2: 0 } },
                    { text: "没规划，不知道钱花哪了", dimensions: { A1: -2, M1: -1, Ac3: -1 } }
                ]
            },
            {
                id: 26,
                text: "关于「分期付款/白条/花呗」，你的使用频率是？",
                options: [
                    { text: "几乎不用，有多少花多少", dimensions: { M1: 2, A1: 2, Ac3: 2 } },
                    { text: "偶尔用，大额消费时分期", dimensions: { M1: 1, A1: 1, Ac1: 0 } },
                    { text: "经常用，习惯性分期", dimensions: { M1: -1, E1: 1, Ac3: -1 } },
                    { text: "离不开...已经欠了不少", dimensions: { M1: -2, E1: 3, Ac3: -3 } }
                ]
            },
            {
                id: 27,
                text: "你愿意为「提升自己」（课程、书籍、健身等）花钱吗？",
                options: [
                    { text: "非常愿意，这是最好的投资", dimensions: { M2: 1, A3: 2, Ac1: 1 } },
                    { text: "愿意，但要选择性投入", dimensions: { M2: 0, A3: 1, M1: 1 } },
                    { text: "看心情，感兴趣才花", dimensions: { E1: 1, A3: 0 } },
                    { text: "不太愿意，免费资源就够了", dimensions: { M2: -1, A3: -1, M1: 1 } }
                ]
            },
            {
                id: 28,
                text: "当朋友讨论工资/收入时，你会？",
                options: [
                    { text: "坦诚分享，没什么好隐瞒", dimensions: { So1: 2, So3: 1 } },
                    { text: "说个大概范围，不完全透露", dimensions: { So1: 1, So3: 0, So2: 1 } },
                    { text: "回避话题，不想聊这个", dimensions: { So1: -1, So2: 2, So3: 1 } },
                    { text: "直接转移话题或离开", dimensions: { So1: -2, So2: 2, So3: 2 } }
                ]
            },
            {
                id: 29,
                text: "你有过因为省钱而后悔的经历吗？",
                options: [
                    { text: "没有，我的选择都是对的", dimensions: { M1: 2, A3: 1, M3: 1 } },
                    { text: "偶尔有，但总体还是对的", dimensions: { M1: 1, A3: 0 } },
                    { text: "有不少，感觉错过了很多", dimensions: { M1: -1, E3: 1, A3: -1 } },
                    { text: "经常后悔...省钱太难了", dimensions: { M1: -2, E3: 2, A3: -2 } }
                ]
            },
            {
                id: 30,
                text: "对于「二手物品」的态度是？",
                options: [
                    { text: "很喜欢，性价比超高！", dimensions: { M1: 2, A3: 1, Ac1: -1 } },
                    { text: "可以接受，看物品类型", dimensions: { M1: 1, A3: 0 } },
                    { text: "不太喜欢，还是新的好", dimensions: { M1: -1, E2: 1, M2: -1 } },
                    { text: "绝对不买，有洁癖", dimensions: { M1: -2, E2: 2, M2: -1 } }
                ]
            },
            {
                id: 31,
                text: "如果让你管理一笔100万的资金，你会怎么分配？",
                options: [
                    { text: "80%稳健+20%进取型投资", dimensions: { A2: 0, Ac1: 0, M1: 1 } },
                    { text: "50%稳健+30%进取+20%现金", dimensions: { A2: 1, Ac1: 1, M1: 0 } },
                    { text: "全部投高收益项目", dimensions: { A2: 3, Ac1: 3, M1: -1 } },
                    { text: "全存银行，安全第一", dimensions: { A2: -3, Ac1: -3, M3: 3 } }
                ]
            },
            {
                id: 32,
                text: "最后一句：你觉得自己的「钱商」如何？",
                options: [
                    { text: "很高！我是理财小能手", dimensions: { M1: 2, A1: 2, M2: 1 } },
                    { text: "还不错，比上不足比下有余", dimensions: { M1: 1, A1: 1, M2: 0 } },
                    { text: "一般般，还在学习中", dimensions: { M1: 0, A1: 0, M2: 0 } },
                    { text: "很低...急需提升", dimensions: { M1: -1, A1: -1, E1: 1 } }
                ]
            }
        ];
    }

    loadPersonalities() {
        this.personalities = [
            {
                id: 'SAVER',
                name: '守财奴',
                code: 'SAVER',
                slogan: '钱只要进了我口袋，就没打算出来。',
                mbti: ['ISTJ', 'ISFJ'],
                interpretation: `从心理学看，你把金钱当作抵御未知恐惧的「安全壁垒」，本质是深层的匮乏感——怕失去、怕失控，所以用「不花钱」的掌控感，填补内心的不确定。从经济学角度，你的储蓄率远超合理区间，资金长期处于「闲置贬值」状态，看似守住了本金，实则输给了通胀和时间，违背了「金钱是流动的资源」的基本逻辑。从哲学层面，你混淆了「金钱是工具」和「金钱是目的」，把省钱当成了人生意义，却忘了钱的本质是为了支撑生活，而非束缚生活——你守的不是钱，是不敢面对「失去」的脆弱自己。`,
                dimensionProfile: { M1: 3, M2: 2, M3: 3, E1: -2, E2: -1, E3: -1, A1: 3, A2: -2, A3: 2, Ac1: -2, Ac2: -1, Ac3: 3, So1: -1, So2: 2, So3: 1 }
            },
            {
                id: 'SAFE',
                name: '安全龟',
                code: 'SAFE',
                slogan: '本金比命重要，收益随缘。',
                mbti: ['ISFP', 'ISTP'],
                interpretation: `心理学上，你属于「风险规避型人格」，对损失的恐惧远大于对收益的渴望（前景理论核心），哪怕是微小的亏损，也会让你产生强烈的心理痛苦，所以宁愿放弃所有收益，也要守住本金的「确定性」。从经济学来看，你陷入了「风险厌恶陷阱」，长期持有低收益资产（如活期存款），看似安全，实则让资金失去了「时间价值」，长期下来，你的财富购买力会持续缩水，反而比「适度承担风险」更不安全。从哲学角度，你把「安全」等同于「活着」，却忽略了「成长本身就需要承担风险」——人生没有绝对的安全，只有「不敢面对风险」的逃避，你守的不是本金，是不敢突破舒适区的懦弱。`,
                dimensionProfile: { M1: 2, M2: 2, M3: 2, E1: -1, E2: 0, E3: 0, A1: 2, A2: -3, A3: 2, Ac1: -3, Ac2: -2, Ac3: 2, So1: 0, So2: 1, So3: 1 }
            },
            {
                id: 'BKKP',
                name: '记账人',
                code: 'BKKP',
                slogan: '每一分钱都要有身份证。',
                mbti: ['ESTJ', 'ESFJ'],
                interpretation: `心理学上，你通过「记账」这种精细化控制，获得内心的秩序感——你害怕混乱、害怕失控，所以用数字的确定性，对抗生活的不确定性，本质是一种「强迫性控制欲」，甚至会因为一笔钱记不清而陷入焦虑。从经济学角度，过度记账会消耗大量的时间成本，而这些时间本可以用来提升自己、创造更多财富，陷入「捡芝麻丢西瓜」的效率陷阱；同时，过度关注每一分钱的流向，会让你失去对「大方向」的判断，反而忽略了资产配置的核心逻辑。从哲学层面，你试图用「数字」定义生活的全部，却忘了生活本就是混沌且充满意外的，过度追求精准和秩序，本质是对「无常」的不接纳——你记的不是账，是试图抓住一切的执念。`,
                dimensionProfile: { M1: 3, M2: 1, M3: 2, E1: -1, E2: 0, E3: 0, A1: 3, A2: -1, A3: 1, Ac1: -1, Ac2: 0, Ac3: 3, So1: 0, So2: 1, So3: 0 }
            },
            {
                id: 'CHEAP',
                name: '抠门精',
                code: 'CHEAP',
                slogan: '能省则省，不省不是中国人。',
                mbti: ['INFJ', 'INTJ'],
                interpretation: `心理学上，你的「抠门」不是节俭，而是深层的自卑和匮乏感——你潜意识里认为自己「不配拥有好东西」，所以通过「省钱」来降低自我价值的消耗，甚至会通过「抠门」来获得一种「我很会过日子」的自我认同。从经济学角度，你陷入了「节俭悖论」：过度节俭会减少消费，而消费是经济循环的核心，长期来看，不仅会降低自己的生活质量，还会让自己失去「花钱买效率、买成长」的机会，反而陷入「越省越穷」的恶性循环。从哲学层面，你把「节俭」当成了一种道德绑架，却混淆了「节俭」和「吝啬」的区别——节俭是合理分配资源，吝啬是放弃生活本身，你省的不是钱，是自己的生活质感和人生体验。`,
                dimensionProfile: { M1: 3, M2: 1, M3: 2, E1: -2, E2: -2, E3: -2, A1: 2, A2: -1, A3: 1, Ac1: -2, Ac2: -2, Ac3: 2, So1: -1, So2: 2, So3: 2 }
            },
            {
                id: 'CALM',
                name: '稳一点',
                code: 'CALM',
                slogan: '别搞我，我只想安安稳稳。',
                mbti: ['ISFJ', 'INFP'],
                interpretation: `心理学上，你属于「稳态型人格」，对变化和波动有强烈的抵触心理，金钱对你而言，核心作用是「维持现状」，而非「创造未来」，你害怕任何可能打破现有生活节奏的理财行为，本质是对「未知」的恐惧。从经济学角度，你错过了「复利效应」的核心——复利的前提是「长期持有+适度风险」，而你追求的「安稳」，本质是放弃了财富增长的可能，长期下来，你的财富会被通胀慢慢侵蚀，看似安稳，实则是一种「被动的贫穷」。从哲学层面，你把「安稳」当成了人生的终极追求，却忘了「人生本就是动态变化的」，拒绝变化，本质是拒绝成长，你追求的不是安稳，是逃避成长的借口。`,
                dimensionProfile: { M1: 2, M2: 1, M3: 1, E1: 0, E2: 0, E3: 0, A1: 1, A2: -2, A3: 1, Ac1: -2, Ac2: -1, Ac3: 1, So1: 0, So2: 1, So3: 1 }
            },
            {
                id: 'BANK',
                name: '储蓄怪',
                code: 'BANK',
                slogan: '看到余额变多，比什么都快乐。',
                mbti: ['ESTP', 'ESFP'],
                interpretation: `心理学上，你把「余额增长」当成了自我价值的唯一证明——你潜意识里缺乏安全感，只能通过「数字的增长」来获得自我认同，余额的每一次增加，都是对自己的一次「正向激励」，本质是一种「数字依赖」。从经济学角度，你陷入了「储蓄成瘾」的陷阱，资金长期闲置，无法发挥其「增值功能」，甚至会因为过度储蓄，忽略了健康、教育等必要的投入，反而损害了长期的财富潜力（人力资本是最大的财富）。从哲学层面，你把「数字」当成了人生的终极追求，却忘了「财富的意义在于支撑生活，而非数字本身」——你追求的不是财富，是通过数字填补内心的空虚和自卑。`,
                dimensionProfile: { M1: 3, M2: 3, M3: 2, E1: -1, E2: -1, E3: -1, A1: 2, A2: -2, A3: 2, Ac1: -1, Ac2: -1, Ac3: 2, So1: 0, So2: 1, So3: 1 }
            },
            {
                id: 'NOBUY',
                name: '不花党',
                code: 'NOBUY',
                slogan: '消费主义别想拿捏我。',
                mbti: ['INTP', 'INTJ'],
                interpretation: `心理学上，你用「拒绝消费」来对抗消费主义的裹挟，本质是一种「反向认同」——你害怕被消费主义定义，所以用「不花钱」的极端方式，彰显自己的独立和清醒，却殊不知，这种极端本身，也是一种被消费主义绑架的表现（用拒绝消费来证明自己的与众不同）。从经济学角度，你忽略了「合理消费是财富循环的一部分」，适度的消费不仅能提升生活质量，还能带动经济增长，而过度的「不消费」，会让你失去很多提升自己、拓展视野的机会，反而限制了财富的增长。从哲学层面，你混淆了「理性消费」和「拒绝消费」的区别——理性消费是掌控自己的欲望，拒绝消费是逃避自己的欲望，你对抗的不是消费主义，是自己内心的不安全感。`,
                dimensionProfile: { M1: 2, M2: 1, M3: 2, E1: -2, E2: -2, E3: 1, A1: 2, A2: -1, A3: 1, Ac1: -2, Ac2: -1, Ac3: 2, So1: 0, So2: 1, So3: 2 }
            },
            {
                id: 'LIMIT',
                name: '底线人',
                code: 'LIMIT',
                slogan: '超过预算一分钱都不花。',
                mbti: ['ISTJ', 'ESTJ'],
                interpretation: `心理学上，你把「预算」当成了人生的「行为准则」，本质是一种「规则依赖」——你害怕混乱、害怕失控，所以用预算来约束自己的行为，获得内心的秩序感，甚至会因为偶尔超出预算而陷入强烈的自责和内耗。从经济学角度，你陷入了「预算僵化陷阱」，预算的本质是「工具」，而非「枷锁」，过度僵化的预算，会让你失去应对突发情况的灵活性，甚至会因为坚守预算，错过「性价比极高」的机会（如低价买入核心资产）。从哲学层面，你试图用「规则」掌控一切，却忘了「生活本就是充满意外的」，过度坚守规则，本质是对「无常」的不接纳，你守的不是预算，是自己内心的执念。`,
                dimensionProfile: { M1: 2, M2: 1, M3: 3, E1: -1, E2: -1, E3: 0, A1: 3, A2: -1, A3: 1, Ac1: -1, Ac2: -1, Ac3: 3, So1: 0, So2: 2, So3: 1 }
            },
            {
                id: 'PLANNER',
                name: '规划师',
                code: 'PLANNER',
                slogan: '人生可以乱，钱不能乱。',
                mbti: ['INTJ', 'ESTJ'],
                interpretation: `心理学上，你属于「秩序型人格」，对金钱的规划，本质是对生活失控感的一种补偿——人生的很多事情无法掌控，所以你试图通过掌控金钱，来获得内心的平衡和安全感，这种规划欲，既是你的优势，也是你的枷锁。从经济学角度，你深谙「资产配置」的核心逻辑，懂得在风险和收益之间找到平衡，重视长期复利，看似理性，却可能因为过度规划，错过「突发的机会」（如市场短期回调的抄底机会），陷入「过度理性的陷阱」。从哲学层面，你把「金钱的秩序」当成了人生的「避风港」，却忘了「人生的美好，往往藏在意外和混乱里」——你规划的不是金钱，是试图用秩序，对抗人生的无常。`,
                dimensionProfile: { M1: 2, M2: 1, M3: 2, E1: 0, E2: 0, E3: 0, A1: 3, A2: 0, A3: 1, Ac1: 0, Ac2: 0, Ac3: 3, So1: 0, So2: 1, So3: 0 }
            },
            {
                id: 'VALUE',
                name: '性价比',
                code: 'VALUE',
                slogan: '只买对的，不买贵的。',
                mbti: ['ISTP', 'INTP'],
                interpretation: `心理学上，你属于「实用主义人格」，对金钱的使用有清晰的认知，不被品牌、面子等外在因素绑架，本质是一种「自我认知清晰」的表现，但过度追求性价比，也可能是一种「隐性的自卑」——害怕被认为「浪费钱」，所以用「性价比」来证明自己的理智。从经济学角度，你深谙「机会成本」的逻辑，懂得在有限的资源里，追求利益最大化，这种理性消费，能让你的财富实现稳步增长，但过度追求性价比，会消耗大量的时间成本（如反复对比价格），反而降低了生活效率。从哲学层面，你把「实用」当成了人生的核心准则，却忘了「生活偶尔也需要不实用的浪漫和惊喜」——你追求的不是性价比，是用理性，掩盖内心对「浪费」的恐惧。`,
                dimensionProfile: { M1: 2, M2: 0, M3: 1, E1: -1, E2: -1, E3: 0, A1: 2, A2: 0, A3: 0, Ac1: -1, Ac2: -1, Ac3: 1, So1: 0, So2: 1, So3: 1 }
            },
            {
                id: 'BALAN',
                name: '分寸人',
                code: 'BALAN',
                slogan: '该花花该省省，情绪稳定。',
                mbti: ['ENTP', 'ENFJ'],
                interpretation: `心理学上，你属于「情绪稳定型人格」，对金钱的态度，本质是对自己情绪的掌控——你不被欲望裹挟，也不被恐惧左右，能在消费和储蓄之间找到平衡，这种稳定，源于你内心的安全感和自我接纳。从经济学角度，你践行「适度消费、合理储蓄、稳健投资」的核心逻辑，既不浪费钱，也不委屈自己，懂得让金钱为生活服务，这种状态，是最接近「财富自由」的心理状态（财富自由的本质是心理自由）。从哲学层面，你理解「金钱是工具，生活是目的」的核心逻辑，不把金钱当成人生的全部，也不忽视金钱的重要性，这种分寸感，本质是对「平衡」的深刻理解——你掌控的不是金钱，是自己的欲望和心态。`,
                dimensionProfile: { M1: 1, M2: 0, M3: 1, E1: 0, E2: 0, E3: 1, A1: 1, A2: 0, A3: 0, Ac1: 0, Ac2: 0, Ac3: 1, So1: 0, So2: 0, So3: 0 }
            },
            {
                id: 'REAL',
                name: '务实党',
                code: 'REAL',
                slogan: '不装不穷不炫，刚刚好。',
                mbti: ['ISFP', 'INFP'],
                interpretation: `心理学上，你属于「自我接纳型人格」，不被「攀比心理」裹挟，对自己的财富状况有清晰的认知，不刻意装富，也不刻意哭穷，本质是内心足够强大，不需要通过金钱来证明自己。从经济学角度，你践行「量入为出」的核心逻辑，根据自己的收入水平，合理安排消费和储蓄，不盲目跟风投资，也不过度节俭，这种务实，能让你的财富稳步积累，避免陷入「负债陷阱」或「储蓄成瘾」。从哲学层面，你理解「金钱是生活的支撑，而非人生的标签」，不把金钱当成衡量自己的唯一标准，这种务实，本质是对「自我价值」的清晰认知——你活的不是金钱，是自己。`,
                dimensionProfile: { M1: 1, M2: 0, M3: 0, E1: 0, E2: 0, E3: 1, A1: 1, A2: 0, A3: 0, Ac1: 0, Ac2: 0, Ac3: 1, So1: 0, So2: 0, So3: 1 }
            },
            {
                id: 'SLOW',
                name: '慢热型',
                code: 'SLOW',
                slogan: '先观察半年，再决定花不花。',
                mbti: ['INTP', 'ISTJ'],
                interpretation: `心理学上，你属于「谨慎型人格」，对金钱的决策，本质是对「错误」的恐惧——你害怕因为冲动消费或投资，导致损失，所以用「慢观察」来降低风险，这种谨慎，既是你的保护色，也是你的绊脚石。从经济学角度，你错过了很多「短期机会」（如限时优惠、市场短期上涨），过度的观察，会让你陷入「观望陷阱」，很多好的机会，往往在你犹豫的瞬间消失；但同时，这种谨慎，也让你避开了很多「陷阱」（如诈骗、高风险骗局），属于「风险与机会并存」的状态。从哲学层面，你把「不犯错」当成了人生的核心准则，却忘了「犯错也是成长的一部分」——你慢的不是决策，是不敢面对错误的勇气。`,
                dimensionProfile: { M1: 1, M2: 0, M3: 1, E1: -1, E2: 0, E3: 0, A1: 1, A2: -1, A3: 0, Ac1: -1, Ac2: -3, Ac3: 0, So1: 0, So2: 1, So3: 0 }
            },
            {
                id: 'CLEAR',
                name: '清醒人',
                code: 'CLEAR',
                slogan: '我知道我在干嘛，不用你教。',
                mbti: ['INTJ', 'INFJ'],
                interpretation: `心理学上，你属于「自我认知清晰型人格」，对金钱的态度，源于你强烈的自我认同——你清楚自己的需求、能力和底线，不被别人的意见裹挟，本质是内心的自信和独立，但这种自信，也可能变成「固执」，拒绝接受合理的建议。从经济学角度，你深谙理财的核心逻辑，懂得根据自己的情况，制定适合自己的理财计划，不盲目跟风，不追求短期收益，注重长期价值，但过度的自我坚持，可能会让你陷入「认知闭环」，错过更好的理财方式。从哲学层面，你把「自我认知」当成了人生的「指南针」，却忘了「认知是需要不断迭代的」——你所谓的「清醒」，可能只是「认知局限」的自我满足。`,
                dimensionProfile: { M1: 2, M2: 1, M3: 1, E1: -1, E2: 0, E3: 1, A1: 2, A2: 0, A3: 1, Ac1: 0, Ac2: -1, Ac3: 2, So1: 0, So2: 1, So3: 1 }
            },
            {
                id: 'FIT',
                name: '适配者',
                code: 'FIT',
                slogan: '钱跟着生活走，不跟着欲望走。',
                mbti: ['ENFJ', 'ESFJ'],
                interpretation: `心理学上，你属于「灵活适配型人格」，对金钱的使用，始终围绕「生活需求」展开，不被欲望裹挟，也不被规则束缚，本质是对「生活本质」的深刻理解——金钱是为生活服务的，而非相反。从经济学角度，你践行「动态资产配置」的逻辑，根据自己的生活阶段（如单身、结婚、育儿），调整消费和投资策略，既不浪费钱，也不委屈自己，让金钱与生活完美适配，这种状态，是最健康的理财心态。从哲学层面，你理解「生活是核心，金钱是工具」的逻辑，不把金钱当成人生的终极追求，也不忽视金钱的重要性，这种适配，本质是对「生活与金钱关系」的正确认知——你掌控的不是金钱，是生活的节奏。`,
                dimensionProfile: { M1: 1, M2: 0, M3: 0, E1: 0, E2: 1, E3: 1, A1: 1, A2: 0, A3: 0, Ac1: 0, Ac2: 0, Ac3: 1, So1: 0, So2: 0, So3: 0 }
            },
            {
                id: 'LONG',
                name: '长期派',
                code: 'LONG',
                slogan: '不在乎一时，只在乎结局。',
                mbti: ['INTJ', 'INTP'],
                interpretation: `心理学上，你属于「延迟满足型人格」，能为了长期目标，放弃短期的诱惑，本质是内心的坚定和自律——你清楚自己的长期目标，不被眼前的得失所困扰，这种特质，是实现财富增长的核心。从经济学角度，你深谙「复利效应」的威力，懂得「时间是财富的朋友」，长期持有优质资产，忽略短期波动，这种策略，能让你的财富实现指数级增长，但过度的长期主义，也可能让你忽略「短期风险」（如资产泡沫、黑天鹅事件），陷入「盲目长期」的陷阱。从哲学层面，你理解「人生是一场马拉松，而非百米冲刺」，不追求一时的得失，注重长期的价值，这种心态，本质是对「时间和价值」的深刻认知——你追求的不是一时的收益，是长期的确定性。`,
                dimensionProfile: { M1: 2, M2: 1, M3: 1, E1: -1, E2: 0, E3: 0, A1: 2, A2: 0, A3: 1, Ac1: 0, Ac2: -1, Ac3: 2, So1: 0, So2: 1, So3: 0 }
            },
            {
                id: 'BUY',
                name: '剁手手',
                code: 'BUY',
                slogan: '购物车清空=人生治愈。',
                mbti: ['ESFP', 'ENFP'],
                interpretation: `心理学上，你属于「冲动型消费人格」，用「购物」来缓解内心的焦虑、空虚和压力，本质是一种「情绪性补偿」——你无法通过内在的方式获得快乐，只能通过外在的物质消费，来填补内心的空洞，这种快乐，是短暂且虚幻的，主打一个「买时爽一时，还款火葬场」。从经济学角度，你陷入了「冲动消费陷阱」，过度消费导致储蓄不足，甚至负债，忽略了「量入为出」的基本逻辑，长期下来，会让你陷入「越买越穷、越穷越买」的恶性循环，主打一个反向财富积累。从哲学层面，你把「物质消费」当成了人生的「治愈方式」，却忘了「真正的治愈，源于内心的丰盈，而非外在的物质」——你剁的不是手，是自己的未来和底气，属于典型的「用钱包的厚度换情绪的温度」。`,
                dimensionProfile: { M1: -2, M2: -1, M3: -2, E1: 3, E2: 2, E3: 0, A1: -2, A2: 1, A3: -1, Ac1: 2, Ac2: 3, Ac3: -3, So1: 0, So2: -1, So3: -1 }
            },
            {
                id: 'HAPPY',
                name: '开心就好',
                code: 'HAPPY',
                slogan: '人生苦短，喜欢就买。',
                mbti: ['ENFP', 'ESFP'],
                interpretation: `心理学上，你属于「享乐主义人格」，认为「人生苦短，及时行乐」，用消费来获取当下的快乐和满足感，本质是对「延迟满足」的抗拒——你不愿意为了未来的不确定，牺牲当下的快乐，这种心态，既是你的自由，也是你的枷锁。从经济学角度，你践行「高消费、低储蓄」的模式，虽然当下的生活质量很高，但抗风险能力极低，一旦遇到突发情况（失业、疾病），就会陷入严重的财务危机，这种「活在当下」的代价，可能是「没有未来」。从哲学层面，你把「快乐」当成了人生的唯一追求，却忘了「真正的快乐，来源于内心的丰盈和生活的掌控感，而非物质的堆砌」——你以为自己在享受生活，其实是在透支未来。`,
                dimensionProfile: { M1: -2, M2: -2, M3: -1, E1: 2, E2: 3, E3: 2, A1: -2, A2: 1, A3: 0, Ac1: 2, Ac2: 2, Ac3: -2, So1: 0, So2: -1, So3: -1 }
            },
            {
                id: 'FACE',
                name: '面子党',
                code: 'FACE',
                slogan: '面子比钱包重要。',
                mbti: ['ESFJ', 'ENFJ'],
                interpretation: `心理学上，你属于「社会认同型人格」，极度在意他人对自己的看法，用消费来维持自己的「社会形象」和「面子」，本质是深层的自卑和不安全感——你需要通过外在的物质标签，来证明自己的价值和地位。从经济学角度，你陷入了「面子消费陷阱」，大量的钱花在了「给别人看」的地方（如奢侈品、高档餐厅、豪车），而这些消费并不能带来真正的幸福感，只会让你越来越空虚，越来越需要更多的消费来维持形象，形成恶性循环。从哲学层面，你把「他人的认可」当成了人生的终极追求，却忘了「真正的尊严，来源于内在的修养和真实的自我，而非外在的标签」——你维护的不是面子，是自己脆弱的自尊心。`,
                dimensionProfile: { M1: -1, M2: -2, M3: -1, E1: 1, E2: 3, E3: -1, A1: -1, A2: 0, A3: -1, Ac1: 1, Ac2: 1, Ac3: -1, So1: -1, So2: -2, So3: -2 }
            },
            {
                id: 'LUCKY',
                name: '赌徒型',
                code: 'LUCKY',
                slogan: '富贵险中求，输了再来过。',
                mbti: ['ESTP', 'ENTP'],
                interpretation: `心理学上，你属于「冒险型人格」，对风险有异常高的容忍度，甚至享受刺激和不确定性，本质是对「平凡生活」的厌倦和对「一夜暴富」的幻想——你相信运气，相信自己会是那个「例外」，却忽略了概率的残酷。从经济学角度，你陷入了「赌徒谬误」的陷阱，过度追求高风险高收益的机会，忽略了风险控制和资产配置的重要性，长期来看，你的期望收益往往是负的（因为大部分高风险投资的失败率极高），你所谓的「冒险」，其实是在「送钱」。从哲学层面，你把「运气」当成了人生的「主旋律」，却忘了「真正的财富，来源于持续的努力和理性的决策，而非一时的运气」——你赌的不是钱，是自己的人生和未来。`,
                dimensionProfile: { M1: -1, M2: 0, M3: -2, E1: 1, E2: 1, E3: 0, A1: -1, A2: 3, A3: 0, Ac1: 3, Ac2: 3, Ac3: -1, So1: 0, So2: 0, So3: 0 }
            },
            {
                id: 'DEBT',
                name: '负债王',
                code: 'DEBT',
                slogan: '花明天的钱，圆今天的梦。',
                mbti: ['ESFP', 'ENFP'],
                interpretation: `心理学上，你属于「逃避型消费人格」，用负债来维持超出自己能力范围的生活水平，本质是对现实的不满和对「理想生活」的幻想——你不愿意接受「自己只能过这样的生活」的现实，所以用借贷来「提前体验」梦想中的生活，却忘了「所有预支的快乐，都需要加倍偿还」。从经济学角度，你陷入了「债务螺旋」的陷阱，利息的不断累积会让你越来越难以偿还，最终可能导致信用破产、资产被拍卖，甚至影响到正常的生活和工作，这种「透支未来」的行为，本质上是在「摧毁自己的人生」。从哲学层面，你把「当下的享受」当成了人生的全部，却忘了「责任和担当，是成年人最基本的品质」——你花的不是银行的钱，是自己的未来和自由。`,
                dimensionProfile: { M1: -3, M2: -3, M3: -3, E1: 3, E2: 2, E3: 1, A1: -3, A2: 1, A3: -2, Ac1: 2, Ac2: 2, Ac3: -3, So1: 0, So2: -1, So3: -1 }
            },
            {
                id: 'CONFUSE',
                name: '迷茫怪',
                code: 'CONFUSE',
                slogan: '钱？什么钱？我不知道啊...',
                mbti: ['INFP', 'ISFP'],
                interpretation: `心理学上，你属于「回避型人格」，对金钱的话题感到焦虑和困惑，本质是对「承担责任」的恐惧——你害怕面对自己的财务状况，害怕做出错误的决策，所以选择「视而不见」，用「不知道」来逃避现实的压力。从经济学角度，你对个人财务的「无知」本身就是最大的风险——不知道自己有多少钱、不知道钱花哪里去了、不知道如何规划，这种状态会让你在不知不觉中陷入财务困境，等到问题爆发时，往往已经来不及挽回。从哲学层面，你把「逃避」当成了一种「解决方案」，却忘了「问题不会因为你不去面对就自动消失」——你迷茫的不是金钱，是自己的人生方向和生活态度。`,
                dimensionProfile: { M1: -2, M2: -1, M3: -1, E1: 1, E2: 0, E3: 0, A1: -2, A2: -1, A3: -1, Ac1: -1, Ac2: -1, Ac3: -2, So1: -1, So2: 1, So3: 0 }
            },
            {
                id: 'SMART',
                name: '精明人',
                code: 'SMART',
                slogan: '每一笔账都算得清清楚楚。',
                mbti: ['ENTJ', 'ESTJ'],
                interpretation: `心理学上，你属于「计算型人格」，对金钱有着极强的敏感度和计算能力，善于发现商机和套利空间，本质是你的「理性思维」在金钱领域的极致体现——你把金钱看作一种「可优化的资源」，不断寻找最优解。从经济学角度，你深谙「信息不对称」和「市场低效」带来的机会，能够通过精明的决策获取超额收益，但这种「过度精明」也可能让你陷入「斤斤计较」的误区，忽略了人际关系和时间成本的重要性，有时候，「难得糊涂」反而是更高的智慧。从哲学层面，你把「利益最大化」当成了人生的唯一目标，却忘了「有些事情是无法用金钱衡量的，如感情、健康、时间」——你算得很清，但可能算丢了生活中最重要的东西。`,
                dimensionProfile: { M1: 2, M2: 1, M3: 1, E1: -1, E2: -1, E3: 0, A1: 2, A2: 1, A3: 0, Ac1: 1, Ac2: 0, Ac3: 2, So1: 1, So2: 1, So3: 0 }
            },
            {
                id: 'GIVE',
                name: '散财童子',
                code: 'GIVE',
                slogan: '钱乃身外之物，花了才是我的。',
                mbti: ['ENFJ', 'ENFP'],
                interpretation: `心理学上，你属于「慷慨型人格」，对他人的需求和感受高度敏感，乐于分享和给予，本质是你强大的「共情能力」和「利他主义」倾向——你通过「给予」来获得快乐和自我价值的确认，这是一种非常珍贵的品质。从经济学角度，你的慷慨虽然让你收获了良好的人际关系和社会声誉，但也可能导致自身的财务储备不足，在面对个人重大支出时（如买房、医疗、养老）会显得力不从心，需要在「利他」和「自保」之间找到更好的平衡。从哲学层面，你践行着「赠人玫瑰，手有余香」的人生智慧，但也需要记住「先照顾好自己，才有能力帮助更多的人」——你的善良很珍贵，但不要让它成为压垮自己的负担。`,
                dimensionProfile: { M1: 0, M2: -1, M3: 0, E1: 0, E2: 3, E3: 1, A1: 0, A2: 0, A3: 0, Ac1: 0, Ac2: 1, Ac3: 0, So1: 1, So2: -2, So3: 0 }
            },
            {
                id: 'INVEST',
                name: '投资人',
                code: 'INVEST',
                slogan: '让钱生钱，才是正经事。',
                mbti: ['INTJ', 'ENTJ'],
                interpretation: `心理学上，你属于「成长型人格」，对财富增值有着强烈的渴望和执念，本质是你对「掌控未来」的追求——你希望通过投资和理财，获得更多的选择权和自由度，这种驱动力，既是你成功的动力，也可能成为你的执念。从经济学角度，你深谙「复利」和「资产配置」的核心逻辑，懂得让钱为你工作，而不是你为钱工作，这种思维模式，是实现财富自由的关键；但你也需要警惕「过度投资」的风险，不要让投资变成赌博，不要让贪婪蒙蔽了理性。从哲学层面，你把「财富增长」当成了人生的重要目标，也需要记得「财富只是手段，幸福才是目的」——你追求的不是钱，是钱背后的自由和选择权。`,
                dimensionProfile: { M1: 1, M2: 2, M3: 1, E1: -1, E2: 0, E3: 0, A1: 1, A2: 2, A3: 1, Ac1: 1, Ac2: 0, Ac3: 2, So1: 0, So2: 0, So3: 0 }
            },
            {
                id: 'MINIMAL',
                name: '极简主义者',
                code: 'MINIMAL',
                slogan: '拥有的越少，自由的越多。',
                mbti: ['INTP', 'ISTP'],
                interpretation: `心理学上，你属于「简约型人格」，对物质欲望有天然的免疫力，崇尚「少即是多」的生活哲学，本质是你对「内在丰盈」的追求胜过「外在拥有」——你不需要通过物质来证明自己，内心已经有足够的支撑。从经济学角度，你的低消费模式让你的储蓄率天然较高，财务压力很小，抗风险能力强，这是一种非常健康的财务状态；但也需要注意「过度节俭」可能错失一些提升生活质量和效率的机会，适度的投入（如健康、教育、体验）是值得的。从哲学层面，你活出了「物质极简，精神丰盈」的理想状态，也要警惕「把极简当成另一种执念」——真正自由的人，是既能拥有，也能放下。`,
                dimensionProfile: { M1: 2, M2: 1, M3: 2, E1: -2, E2: -2, E3: 2, A1: 2, A2: -1, A3: 2, Ac1: -1, Ac2: -1, Ac3: 2, So1: 0, So2: 1, So3: 2 }
            },
            {
                id: 'CTRL',
                name: 'CTRL拿捏者',
                code: 'CTRL',
                slogan: '怎么样，被我拿捏了吧？',
                mbti: ['ENTJ', 'INTJ'],
                interpretation: `恭喜你触发了隐藏人格！你是一个极其特殊的个体——你对金钱有着近乎完美的掌控力，既能精打细算，又敢于在关键时刻果断出手；既有长期的战略眼光，又不失灵活的战术调整。你不是被金钱支配的人，而是真正「拿捏」金钱的人。心理学上看，你拥有极高的自我认知和情绪稳定性，不会被欲望裹挟，也不会因恐惧而退缩，这种「拿捏感」源于你对自身能力和外界环境的清晰判断。从经济学角度，你是最接近「理性经济人」的存在，每一个决策都经过成本-收益分析，但又不会陷入过度计算的僵化。从哲学层面，你已经超越了「金钱是工具还是目的」的争论，因为你清楚地知道：金钱只是棋盘上的棋子，而你，才是那个下棋的人。`,
                isSpecial: true,
                dimensionProfile: { M1: 2, M2: 1, M3: 1, E1: 0, E2: 0, E3: 1, A1: 2, A2: 1, A3: 1, Ac1: 1, Ac2: 0, Ac3: 2, So1: 1, So2: 1, So3: 1 }
            },
            {
                id: 'OHNO',
                name: 'OH-NO哦不人',
                code: 'OHNO',
                slogan: '哦不！我怎么会是这个人格？！',
                mbti: ['INFP', 'ISFP'],
                interpretation: `恭喜你触发了另一个隐藏人格！看到结果的你，此刻内心一定在咆哮：「这不科学！我不承认！」——但恰恰是这种「强烈的不认同反应」，暴露了你最真实的财务人格：一个在金钱问题上充满矛盾、挣扎、自我否认的人。心理学上看，你的「金钱自我」和「理想自我」存在巨大的鸿沟，你希望自己是一个理性、自律、有规划的人，但现实中的你，却经常被冲动、情绪、面子所左右，这种「认知失调」让你痛苦，也让你成长。从经济学角度，你的财务行为充满了「非理性」特征，经常在做完决定后后悔，却又在下一次重蹈覆辙，这其实是大多数人的常态，不必过分苛责自己。从哲学层面，接受自己的不完美，才是改变的第一步——你不必成为「CTRL拿捏者」，但至少可以试着与自己和解，找到一个更舒服的状态。`,
                isSpecial: true,
                dimensionProfile: { M1: -1, M2: -1, M3: -1, E1: 2, E2: 1, E3: -1, A1: -1, A2: 0, A3: -1, Ac1: 1, Ac2: 1, Ac3: -1, So1: -1, So2: 0, So3: -1 }
            }
        ];
    }

    startQuiz() {
        this.currentQuestion = 0;
        this.answers = [];
        this.initDimensions();
        this.showPage('quizPage');
        this.renderQuestion();
    }

    renderQuestion() {
        const question = this.questions[this.currentQuestion];
        document.getElementById('questionNumber').textContent = `Q${this.currentQuestion + 1}`;
        document.getElementById('questionText').textContent = question.text;

        const progress = ((this.currentQuestion) / this.questions.length) * 100;
        document.getElementById('progressBar').style.width = `${progress}%`;
        document.getElementById('progressText').textContent = `问题 ${this.currentQuestion + 1} / ${this.questions.length}`;

        const optionsContainer = document.getElementById('optionsContainer');
        optionsContainer.innerHTML = '';

        const labels = ['A', 'B', 'C', 'D'];
        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span class="option-label">${labels[index]}</span> ${option.text}`;
            btn.onclick = () => this.selectOption(index);
            optionsContainer.appendChild(btn);
        });
    }

    selectOption(optionIndex) {
        const question = this.questions[this.currentQuestion];
        const selectedOption = question.options[optionIndex];

        this.answers.push({
            questionId: question.id,
            optionIndex: optionIndex,
            dimensions: selectedOption.dimensions
        });

        Object.entries(selectedOption.dimensions).forEach(([dim, value]) => {
            if (this.dimensions[dim]) {
                this.dimensions[dim].score += value;
            }
        });

        this.currentQuestion++;

        if (this.currentQuestion < this.questions.length) {
            this.renderQuestion();
        } else {
            this.showLoading(true);
            setTimeout(() => {
                this.calculateResult();
                this.showLoading(false);
                this.showPage('resultPage');
                this.renderResult();
            }, 800);
        }
    }

    calculateResult() {
        let bestMatch = null;
        let minDistance = Infinity;

        this.personalities.forEach(personality => {
            let totalDistance = 0;
            Object.keys(this.dimensions).forEach(dim => {
                const userScore = this.dimensions[dim].score;
                const profileScore = personality.dimensionProfile[dim] || 0;
                totalDistance += Math.pow(userScore - profileScore, 2);
            });

            if (totalDistance < minDistance) {
                minDistance = totalDistance;
                bestMatch = personality;
            }
        });

        return bestMatch;
    }

    renderResult() {
        const result = this.calculateResult();

        document.getElementById('resultTypeName').textContent = result.name;
        document.getElementById('resultCode').textContent = result.code;
        document.getElementById('resultSlogan').textContent = `"${result.slogan}"`;

        document.getElementById('interpretationText').textContent = result.interpretation;

        this.renderCharacterAvatar(result);
        this.renderRadarChart(result);
        this.renderDimensionList(result);
        this.renderMBTICompare(result);
    }

    renderCharacterAvatar(result) {
        const character = document.getElementById('characterAvatar');
        if (!character) return;

        character.className = 'character';
        character.innerHTML = `
            <div class="char-head">
                <div class="char-face">
                    <div class="char-eyes">
                        <div class="char-eye"></div>
                        <div class="char-eye"></div>
                    </div>
                    <div class="char-mouth"></div>
                </div>
            </div>
            <div class="char-body"></div>
            <div class="char-arms">
                <div class="char-arm char-arm-left"></div>
                <div class="char-arm char-arm-right"></div>
            </div>
            <div class="char-legs">
                <div class="char-leg"></div>
                <div class="char-leg"></div>
            </div>
        `;

        const code = result.code.toUpperCase();
        character.classList.add(`personality-${code}`);

        const accessoryMap = {
            'SAVER': '<div class="char-piggy-bank char-accessory"></div>',
            'SAFE': '<div class="char-helmet char-accessory"></div>',
            'BKKP': '<div class="char-glasses char-accessory"></div><div class="char-notebook char-accessory"></div>',
            'CHEAP': `<div class="char-coins char-accessory"><div class="char-coin"></div><div class="char-coin"></div><div class="char-coin"></div></div>`,
            'CALM': '<div class="char-pillow char-accessory"></div><div class="char-zzz char-accessory">💤</div>',
            'BANK': '<div class="char-money-bag char-accessory"></div>',
            'NOBUY': '<div class="char-x-mark char-accessory"></div>',
            'LIMIT': '<div class="char-ruler char-accessory"></div>',
            'PLANNER': '<div class="char-calendar char-accessory"></div>',
            'VALUE': '<div class="char-magnifier char-accessory"></div>',
            'BALAN': '<div class="char-scale char-accessory"></div>',
            'REAL': '<div class="char-thumb char-accessory"></div>',
            'SLOW': '<div class="char-hourglass char-accessory"></div>',
            'CLEAR': '<div class="char-lightbulb char-accessory"></div>',
            'FIT': '<div class="char-gear char-accessory"></div>',
            'LONG': '<div class="char-telescope char-accessory"></div>',
            'BUY': `<div class="char-shopping-bags char-accessory"><div class="char-bag"></div><div class="char-bag"></div></div>`,
            'HAPPY': '<div class="char-party-hat char-accessory"></div>',
            'FACE': '<div class="char-sunglasses char-accessory"><span></span></div>',
            'LUCKY': '<div class="char-dice char-accessory"></div>',
            'DEBT': `<div class="char-cards-stack char-accessory"><div class="char-card"></div><div class="char-card"></div><div class="char-card"></div></div><div class="char-sweat char-accessory">😓</div>`,
            'CONFUSE': `<div class="char-question-marks char-accessory"><div class="char-q">?</div><div class="char-q">?</div><div class="char-q">?</div></div>`,
            'SMART': '<div class="char-calculator char-accessory"></div>',
            'GIVE': '<div class="char-gift-box char-accessory"></div>',
            'INVEST': '<div class="char-chart char-accessory"></div>',
            'MINIMAL': '<div class="char-minus char-accessory">−</div>',
            'CTRL': '<div class="char-crown char-accessory"></div><div class="char-cool-glasses char-accessory"></div>',
            'OHNO': '<div class="char-oh-no-text char-accessory">OH NO!</div>'
        };

        if (accessoryMap[code]) {
            character.insertAdjacentHTML('beforeend', accessoryMap[code]);
        }

        const faceModifierMap = {
            'BUY': 'char-heart-eyes',
            'HAPPY': 'char-big-smile',
            'OHNO': 'char-shocked-face',
            'CTRL': 'char-confident-smile'
        };

        if (faceModifierMap[code]) {
            const face = character.querySelector('.char-face');
            if (face) {
                face.classList.add(faceModifierMap[code]);
            }
        }
    }

    renderRadarChart(result) {
        const canvas = document.getElementById('radarChart');
        const ctx = canvas.getContext('2d');

        const container = canvas.parentElement;
        canvas.width = container.offsetWidth * 2;
        canvas.height = container.offsetHeight * 2;
        ctx.scale(2, 2);

        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
        const radius = Math.min(centerX, centerY) - 40;

        const dims = Object.keys(this.dimensions);
        const angleStep = (Math.PI * 2) / dims.length;

        ctx.clearRect(0, 0, container.offsetWidth, container.offsetHeight);

        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            const r = radius * (i / 5);
            for (let j = 0; j <= dims.length; j++) {
                const angle = angleStep * j - Math.PI / 2;
                const x = centerX + r * Math.cos(angle);
                const y = centerY + r * Math.sin(angle);
                if (j === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = 'rgba(102, 126, 234, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        dims.forEach((dim, i) => {
            const angle = angleStep * i - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = 'rgba(102, 126, 234, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();

            const labelX = centerX + (radius + 25) * Math.cos(angle);
            const labelY = centerY + (radius + 25) * Math.sin(angle);

            ctx.font = '11px -apple-system, sans-serif';
            ctx.fillStyle = '#4a5568';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(dim, labelX, labelY);
        });

        ctx.beginPath();
        dims.forEach((dim, i) => {
            const userScore = this.dimensions[dim].score;
            const normalizedScore = Math.max(-3, Math.min(3, userScore));
            const r = radius * ((normalizedScore + 3) / 6);
            const angle = angleStep * i - Math.PI / 2;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.closePath();

        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, 'rgba(102, 126, 234, 0.5)');
        gradient.addColorStop(1, 'rgba(118, 75, 162, 0.25)');
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        dims.forEach((dim, i) => {
            const userScore = this.dimensions[dim].score;
            const normalizedScore = Math.max(-3, Math.min(3, userScore));
            const r = radius * ((normalizedScore + 3) / 6);
            const angle = angleStep * i - Math.PI / 2;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);

            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#667eea';
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2.5;
            ctx.stroke();
        });
    }

    renderDimensionList(result) {
        const container = document.getElementById('dimensionList');
        container.innerHTML = '';

        const categories = {};
        Object.entries(this.dimensions).forEach(([key, dim]) => {
            if (!categories[dim.category]) {
                categories[dim.category] = [];
            }
            categories[dim.category].push({ key, ...dim });
        });

        Object.entries(categories).forEach(([category, dims]) => {
            dims.forEach(dim => {
                const item = document.createElement('div');
                item.className = 'dimension-item';

                const score = dim.score;
                let scoreText = '';
                let scoreColor = '';

                if (score >= 2) {
                    scoreText = '极高';
                    scoreColor = '#e53e3e';
                } else if (score >= 1) {
                    scoreText = '较高';
                    scoreColor = '#dd6b20';
                } else if (score <= -2) {
                    scoreText = '极低';
                    scoreColor = '#38a169';
                } else if (score <= -1) {
                    scoreText = '较低';
                    scoreColor = '#3182ce';
                } else {
                    scoreText = '中等';
                    scoreColor = '#718096';
                }

                item.innerHTML = `
                    <div class="dimension-name">${dim.key} · ${dim.name}</div>
                    <div class="dimension-value">
                        得分：<strong style="color: ${scoreColor}">${score > 0 ? '+' : ''}${score}</strong> (${scoreText}) | ${category}
                    </div>
                `;
                container.appendChild(item);
            });
        });
    }

    renderMBTICompare(result) {
        const container = document.getElementById('mbtiCompare');
        container.innerHTML = '';

        result.mbti.forEach(mbtiType => {
            const div = document.createElement('div');
            div.className = 'mbti-type';
            div.innerHTML = `
                <div class="mbti-code">${mbtiType}</div>
                <div class="mbti-desc">最接近的MBTI镜像</div>
            `;
            container.appendChild(div);
        });
    }

    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');

        window.scrollTo(0, 0);
    }

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (show) {
            overlay.classList.add('active');
        } else {
            overlay.classList.remove('active');
        }
    }
}

function startQuiz() {
    window.qbtiEngine.startQuiz();
}

function restartQuiz() {
    if (confirm('确定要重新测试吗？当前结果将会丢失。')) {
        window.qbtiEngine.startQuiz();
    }
}

function shareResult() {
    const result = window.qbtiEngine.calculateResult();

    const shareText = `🎯 我的QBTI钱商人格是：${result.name}（${result.code}）\n\n💬 "${result.slogan}"\n\n快来测测你的理财灵魂吧！`;

    if (navigator.share) {
        navigator.share({
            title: 'QBTI 钱商人格测试',
            text: shareText,
            url: window.location.href
        }).catch(() => {
            fallbackShare(shareText);
        });
    } else {
        fallbackShare(shareText);
    }
}

function fallbackShare(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        alert('结果已复制到剪贴板！快去分享给朋友吧 🎉');
    } catch (err) {
        alert('分享功能暂不可用，请手动截图分享');
    }

    document.body.removeChild(textarea);
}

window.addEventListener('DOMContentLoaded', () => {
    window.qbtiEngine = new QBTIEngine();
});