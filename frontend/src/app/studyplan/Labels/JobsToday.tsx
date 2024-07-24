import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

function JobsToday() {
    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
        console.log(`checked = ${e.target.name}`);
    };
    return (
        <div className="overflow-auto w-full h-44">
            <div className="rounded-xl bg-[#f8f9fa] p-2 mb-2 mr-2 border border-[#e0e0e0] h-full 	w-[12.599rem] overflow-auto	inline-block">
                <div>
                    <p className="font-bold"> hoc tu vugn</p>
                    <p className="">
                        <Checkbox name="hocdiem" onChange={onChange}>
                            hoc dem
                        </Checkbox>
                    </p>

                    <p>
                        <Checkbox onChange={onChange}>Senve</Checkbox>
                    </p>
                    <p>
                        <Checkbox onChange={onChange}>
                            tạo niềm tin cho côộc sống
                        </Checkbox>
                    </p>
                    <p>
                        <Checkbox onChange={onChange}>
                            Stading next to you
                        </Checkbox>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default JobsToday;
