const MESSAGES = require('../utils/messages');

class ScenarioStep {
    constructor(id) {
        this.id = id;
    }

    setPayload(payload) {
        this.payload = payload;
    }

    toString() {
        return `${this.id} - ${JSON.stringify(this.payload)}`;
    }
}

class Scenario {
    constructor() {
        this.scenarioSteps = [];
        this.index = 0;
    }

    addStep(step) {
        this.scenarioSteps.push(step);
        return this;
    }

    current() {
        return this.scenarioSteps[this.index];
    }

    hasNext() {
        return this.index + 1 < this.scenarioSteps.length;
    }

    next() {
        if (!this.hasNext()) {
            return;
        }

        return this.scenarioSteps[++this.index];
    }

    reset() {
        this.index = 0;
    }

    toString() {
        return this.scenarioSteps.map((step) => step.toString());
    }
}

class ScenarioFactory {
    static get() {
        return new Scenario()
            .addStep(new ScenarioStep(MESSAGES.GET_STARTED.id))
            .addStep(new ScenarioStep(MESSAGES.REPORT_HARASS_INCIDENT.id))
            .addStep(new ScenarioStep(MESSAGES.PLEASE_GIVE_US_MORE_DETAILS.id))
            .addStep(new ScenarioStep(MESSAGES.WHEN_DID_THE_INCIDENT_HAPPEN.id))
            .addStep(new ScenarioStep(MESSAGES.AT_WHICH_TIME_THE_INCIDENT_HAPPENED.id))
            .addStep(new ScenarioStep(MESSAGES.WHERE_DID_THE_INCIDENT_HAPPEN.id))
            .addStep(new ScenarioStep(MESSAGES.KIND_OF_HARASSMENT.id))
            .addStep(new ScenarioStep(MESSAGES.TYPE_OF_HARASSMENT_LOCATION.id))
            .addStep(new ScenarioStep(MESSAGES.DID_YOU_GET_SOME_HELP_FROM_OTHERS.id))
            .addStep(new ScenarioStep(MESSAGES.WHAT_IS_HARASSER_AGE.id))
            .addStep(new ScenarioStep(MESSAGES.WHAT_IS_YOUR_DEGREE.id))
            .addStep(new ScenarioStep(MESSAGES.WHAT_IS_YOUR_AGE.id))
            .addStep(new ScenarioStep(MESSAGES.DO_YOU_HAVE_PHOTOS_FROM_THE_INCIDENT.id))
            .addStep(new ScenarioStep(MESSAGES.INCIDENT_CONFIRMATION.id))
        ;
    }
}

module.exports = {
    Scenario,
    ScenarioStep,
    ScenarioFactory
};
