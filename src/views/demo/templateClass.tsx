import { PureComponent } from "react";

interface IProps {
  name: string,
  age?: number
}

interface IState {
  message: string
  counter: string
}
// 3. Snapshot 类型
interface ISnapshot {
  address: string
}

//组件属性类型（props）、组件状态类型（state）、快照类型（snapshot）
class TemplateClass extends PureComponent<IProps, IState, ISnapshot> {
  constructor(props: IProps) {
    super(props)
  }
 // 必须实现这个生命周期，才能拿到 snapshot！
  getSnapshotBeforeUpdate(): ISnapshot {
    return {
      address: "北京市"
    };
  }

  // 组件更新完成
  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: ISnapshot
  ): void {
    // 可以拿到 snapshot
    if (snapshot) {
      console.log("快照地址：", snapshot.address);
    }
  }
  render(): React.ReactNode {
    return <div>TemplateClass</div>
  }
}

export default TemplateClass