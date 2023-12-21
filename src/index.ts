import * as rclnodejs from 'rclnodejs';
import Publisher from './ros/publisher';
import Node from './ros/node';

async function example() {

  await rclnodejs.init();
  let node = rclnodejs.createNode('MyNode');

  const m_node: Node = new Node('rmclnodejs');
  const publisher: Publisher = m_node.create_publisher('chatter', 1, 'std_msgs/msg/String');
  const t_publisher: Publisher = m_node.create_publisher('tester', 1, 'sensor_msgs/msg/LaserScan');
  
  node.createTimer(1000, () => {
    const message: any = {
      "data": "rmclnodejs"
    }

    publisher.publish(message);

    const t_message: any = {
      "angle_min": 0.5,
      "angle_max": 0.7
    }

    t_publisher.publish(t_message);
  });

  node.spin();
}

(async function main(): Promise<void> {
  example();
})().catch((): void => {
  process.exitCode = 1
})