import * as rclnodejs from 'rclnodejs';
import Publisher from './ros/publisher';

async function example() {

  await rclnodejs.init();
  let node = rclnodejs.createNode('MyNode');

  const publisher: Publisher = new Publisher('chatter', 1, 'std_msgs.msg.String');
  const t_publisher: Publisher = new Publisher('tester', 1, 'sensor_msgs.msg.LaserScan');
  
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