import MqttClient from "../mqtt/mqtt_client";

export default class Publisher {
    mqtt_client: MqttClient | undefined;
    mqtt_register_publisher_topic: string | undefined;

    topic: string | undefined;
    qos: number | undefined;
    message_type: string | undefined;

    constructor(mqtt_client: MqttClient, topic: string, qos: number, message_type: string) {
        this.mqtt_client = mqtt_client;
        this.mqtt_register_publisher_topic = 'net/wavem/robotics/rt/register/publisher';

        this.topic = topic;
        this.qos = qos;
        this.message_type = message_type;
        
        const publisher_json: any = {
            topic,
            qos,
            message_type
        };

        this.mqtt_client!.publish(this.mqtt_register_publisher_topic!, JSON.stringify(publisher_json));
    }

    public publish(message: any): void {
        let t: string = '';

        if (!this.topic!.includes('/')) {
            t = `/${this.topic!}`;
        }

        const mqtt_publish_topic: string = `net/wavem/robotics/rt/publish${t}`;

        this.mqtt_client!.publish(mqtt_publish_topic, JSON.stringify(message));
    }
}