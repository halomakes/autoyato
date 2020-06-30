class AutoYato {
    topic;
    sources;
    binder;

    subject;
    derogatory;
    alternative;
    ticks;

    initialize = topic => {
        console.info(`Initializing for topic ${topic}`);
        this.binder = new GravyBinder(this);
        this.loadSources(topic);
    };

    setTextFields = () => {
        this.subject = this.topic.topic;
        this.derogatory = this.pickArray(this.topic.derogatory);
        this.alternative = this.pickArray(this.topic.alternative);
        this.showFields(969, 5);
    }

    showFields = (delay, max) => {
        this.ticks = 0;
        this.binder.updateOutwardBindings();
        const interval = window.setInterval(() => {
            this.ticks++;
            if (this.ticks >= max) {
                window.clearInterval(interval);
            }
            this.binder.updateOutwardBindings();
        }, delay);
    }

    getRandomTopic = () => this.pickDict(this.sources);

    getTopic = topicName => this.sources[topicName];

    loadSources = topic => fetch('/sources.json').then(r => r.json().then(j => {
        this.sources = j;
        this.topic = topic && this.containsKey(this.sources, topic)
            ? this.getTopic(topic)
            : this.getRandomTopic();
        this.setTextFields();
    }));

    pickArray = array => array[Math.floor(Math.random() * array.length)];

    pickDict = dictionary => dictionary[this.pickArray(Object.keys(dictionary))];

    containsKey = (dictionary, key) => Object.keys(dictionary).includes(key);
}

const ay = new AutoYato();
ay.initialize(window.location.pathname.toLocaleLowerCase().replace(/\W/g, ''));