import MqttClient from "../mqtt/mqtt_client";
import Publisher from "./publisher";

export default class Node {
    mqtt_client: MqttClient | undefined;

    constructor(node_name: string) {
        this.mqtt_client = new MqttClient();
        
        const node_json: any = {
            "node_name": node_name
        }
        
        this.mqtt_client.publish('net/wavem/robotics/rt/register/node', JSON.stringify(node_json));
    }

    public create_publisher(topic: string, qos: number, message_type: string): Publisher {
        const mqtt_register_publisher_topic: string = 'net/wavem/robotics/rt/register/publisher';
        
        const publisher_json: any = {
            topic,
            qos,
            message_type
        };

        this.mqtt_client!.publish(mqtt_register_publisher_topic, JSON.stringify(publisher_json));

        const publisher: Publisher = new Publisher(this.mqtt_client!, topic, qos, message_type);
        return publisher;
    }
}