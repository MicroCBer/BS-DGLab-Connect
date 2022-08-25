<script>
	import {
		Button,
		TextBlock,
		TextBox,
		Expander,
		TextBoxButton,
		RadioButton,
		ProgressBar,
		ProgressRing,
		Slider,
	} from "fluent-svelte";
	import "fluent-svelte/theme.css";

	import { onMount } from "svelte";

	import opendglab from "./dglab.js";

	const { OpenDGLab, WaveCenter, KDataUtils } = opendglab;

	let datapuller = { readyState: -1 };

	let lastDataA, lastDataB;
	let strength = 30;

	let state = {
		showConnect: false,
		showRemoteServer: false,
		showAuthOverlay: false,
		isConnect: true,
		strengthA: 100,
		strengthB: 100,
		strengthStepA: 1,
		strengthStepB: 1,
		channelAAuto: false,
		channelBAuto: false,
		waveA: WaveCenter.Companion.getBasicWave("Breath"),
		waveB: WaveCenter.Companion.getBasicWave("Breath"),
		dataA: [],
		dataB: [],
		waveLagA: 0,
		waveLagB: 0,
		customWave: "",
		customWaveUnsaved: "",
		customWaveSaved: true,
		autoChangeA: 200,
		autoChangeB: 200,
	};

	onMount(() => {
		window.dglab = new OpenDGLab();
		window.dglab.electric = 0;
		window.dglab.handler = {};

		window.state = state;

		function setState(rstate) {
			for (let key in rstate) state[key] = rstate[key];
		}

		let timerA = setInterval(() => {
			if (window.dgble && state.isConnect) {
				if (state.showRemoteServer) {
					let data = remoteDataA.shift();
					if (data !== undefined) {
						lostA = 0;
						let wa = data.bytes;
						let strength = data.strength;
						let waveA = KDataUtils.convertStringToByteArray(wa);
						window.dgble.eStimStatus.waveA.writeValueWithoutResponse(
							Uint8Array.from(waveA)
						);
						if (remoteALast !== strength) {
							let power =
								window.dglab.eStimStatus.abPower.setABPower(
									strength,
									window.dglab.eStimStatus.abPower.getBPower()
								);
							window.dgble.eStimStatus.abpower.writeValueWithoutResponse(
								Uint8Array.from(power.data)
							);
							remoteALast = strength;
						}
					} else {
						lostA = lostA + 1;
						if (lostA > 4 && state.strengthA !== 0) {
							let power =
								window.dglab.eStimStatus.abPower.setABPower(
									0,
									window.dglab.eStimStatus.abPower.getBPower()
								);
							window.dgble.eStimStatus.abpower.writeValueWithoutResponse(
								Uint8Array.from(power.data)
							);
							remoteALast = 0;
						}
					}
				} else {
					let lag = Date.now() - lastDataA;
					let wlag = 0;
					if (lag > 100) {
						wlag = Math.ceil((lag - 100) / 100.0);
					}
					setState({ waveLagA: wlag });
					lastDataA = Date.now();
					let waveA = null;
					if (state.strengthA !== 0) {
						waveA = window.dglab.eStimStatus.wave
							.getWaveCenterA()
							.waveTick();
						let plot = Array.from(
							window.dglab.eStimStatus.wave
								.getWaveCenterA()
								.getWavePlot()
						);
						let plotData = state.dataA.concat(plot);
						if (plotData.length > 100) {
							plotData = plotData.slice(plotData.length - 100);
						}
						setState({
							dataA: plotData,
						});
					}
					if (waveA !== null)
						window.dgble.eStimStatus.waveB.writeValueWithoutResponse(
							Uint8Array.from(waveA)
						);
					if (state.channelAAuto) {
						let last = state.autoChangeA - 1;
						if (last === 0) {
							setState({ autoChangeA: 200 });
							let rlength = waveSource.length;
							if (state.customWave === "") rlength = rlength - 1;
							let random = Math.floor(Math.random() * rlength);
							handleWaveChangeA(waveSource[random].value);
						} else {
							setState({ autoChangeA: last });
						}
					}
				}
			}
		}, 100);
		let timerB = setInterval(() => {
			if (window.dgble) {
				let lag = Date.now() - lastDataB;
				let wlag = 0;
				if (lag > 100) {
					wlag = Math.ceil((lag - 100) / 100.0);
				}
				setState({ waveLagB: wlag });
				lastDataB = Date.now();
				let waveB = null;
				if (state.strengthB !== 0) {
					waveB = window.dglab.eStimStatus.wave
						.getWaveCenterB()
						.waveTick();
					let plot = Array.from(
						window.dglab.eStimStatus.wave
							.getWaveCenterB()
							.getWavePlot()
					);
					let plotData = state.dataB.concat(plot);
					if (plotData.length > 100) {
						plotData = plotData.slice(plotData.length - 100);
					}
					setState({
						dataB: plotData,
					});
				}
				if (waveB !== null)
					window.dgble.eStimStatus.waveA.writeValueWithoutResponse(
						Uint8Array.from(waveB)
					);
				if (state.channelBAuto) {
					let last = state.autoChangeB - 1;
					if (last === 0) {
						setState({ autoChangeB: 200 });
						let rlength = waveSource.length;
						if (state.customWave === "") rlength = rlength - 1;
						let random = Math.floor(Math.random() * rlength);
						handleWaveChangeB(waveSource[random].value);
					} else {
						setState({ autoChangeB: last });
					}
				}
			}
		}, 100);
	});

	function fireChange(...args) {
		console.warn(...args);
	}
	// OpenDGLab

	function connectDGLab() {
		return new Promise((resolve) => {
			navigator.bluetooth
				.requestDevice({
					filters: [{ name: OpenDGLab.Device.Companion.getName() }],
					optionalServices: OpenDGLab.Device.Companion.services(),
				})
				.then((device) => {
					if (device.gatt) {
						window.dgble = {};
						window.dgble.device = device;
						window.dgble.device.gatt
							.connect()
							.then(async (server) => {
								window.dgble.server = server;
								console.log({
									message: "",
									connected: true,
									wait: true,
								});
								window.dgble.deviceStatusService =
									await server.getPrimaryService(
										OpenDGLab.DeviceStatus.Companion.getUUID()
									);
								window.dgble.eStimStatusService =
									await server.getPrimaryService(
										OpenDGLab.EStimStatus.Companion.getUUID()
									);
								window.dgble.deviceStatus = {};
								window.dgble.deviceStatus.electric =
									await window.dgble.deviceStatusService.getCharacteristic(
										OpenDGLab.DeviceStatus.Electric.Companion.getUUID()
									);
								window.dgble.eStimStatus = {};
								window.dgble.eStimStatus.abpower =
									await window.dgble.eStimStatusService.getCharacteristic(
										OpenDGLab.EStimStatus.ABPower.Companion.getUUID()
									);
								window.dgble.eStimStatus.waveA =
									await window.dgble.eStimStatusService.getCharacteristic(
										OpenDGLab.EStimStatus.Wave.Companion.getUUIDA()
									);
								window.dgble.eStimStatus.waveB =
									await window.dgble.eStimStatusService.getCharacteristic(
										OpenDGLab.EStimStatus.Wave.Companion.getUUIDB()
									);

								alert("连接成功");

								return window.dgble.deviceStatus.electric.readValue();
							})
							.then(async (value) => {
								window.dglab.electric =
									window.dglab.deviceStatus.electric.read(
										Array.from(new Uint8Array(value.buffer))
									);
								console.log({ power: window.dglab.electric });
								window.dglab.handler.abpower = (event) => {
									let data = Array.from(
										new Uint8Array(
											event.target.value.buffer
										)
									);
									window.dglab.eStimStatus.abPower.onChange(
										data
									);
									fireChange("strengthchanged");
								};
								window.dglab.handler.electric = (event) => {
									let data = Array.from(
										new Uint8Array(
											event.target.value.buffer
										)
									);
									let electric =
										window.dglab.deviceStatus.electric.onChange(
											data
										);
									window.dglab.electric = electric;
								};
								window.dgble.eStimStatus.abpower
									.startNotifications()
									.then((_) => {
										window.dgble.eStimStatus.abpower.addEventListener(
											"characteristicvaluechanged",
											window.dglab.handler.abpower
										);
									});
								window.dgble.deviceStatus.electric
									.startNotifications()
									.then((_) => {
										window.dgble.deviceStatus.electric.addEventListener(
											"characteristicvaluechanged",
											window.dglab.handler.electric
										);
									});
								fireChange("waveAchanged");
								fireChange("waveBchanged");
								let power =
									window.dglab.eStimStatus.abPower.setABPower(
										0,
										0
									);
								window.dgble.eStimStatus.abpower.writeValueWithoutResponse(
									Uint8Array.from(power.data)
								);
								resolve(true);
								console.log({ wait: false });
							})
							.catch((error) => {
								console.error(error);
								console.log({
									message: "连接错误",
									connected: false,
									wait: false,
								});
								resolve(false);
							});
					}
				})
				.catch((error) => {
					if (error.code !== 8) {
						console.log({
							message: "发生错误",
							connected: false,
							wait: false,
						});
						resolve(false);
					}
				});
		});
	}

	function testInc() {
		let power = window.dglab.eStimStatus.abPower.setABPower(
			strength,
			strength
		);
		window.dgble.eStimStatus.abpower.writeValueWithoutResponse(
			Uint8Array.from(power.data)
		);

		window.dglab.eStimStatus.wave.getWaveCenterA().selectWave(state.waveB);
		window.dglab.eStimStatus.wave.getWaveCenterB().selectWave(state.waveB);

		setTimeout(() => {
			let power = window.dglab.eStimStatus.abPower.setABPower(0, 0);
			window.dglab.eStimStatus.wave.getWaveCenterA().selectWave(null);
			window.dglab.eStimStatus.wave.getWaveCenterB().selectWave(null);
			window.dgble.eStimStatus.abpower.writeValueWithoutResponse(
				Uint8Array.from(power.data)
			);
		}, 300);
	}

	function connectToDataPuller() {
		let lock = false;
		datapuller = new WebSocket("ws://0.0.0.0:2946/BSDataPuller/LiveData");
		readyState = 0;
		datapuller.addEventListener("error", (e) => (readyState = -1));
		datapuller.addEventListener("close", (e) => (readyState = -1));
		datapuller.addEventListener("message", (e) => {
			readyState = 1;
			let data = JSON.parse(e.data);
			if (data.EventTrigger !== 3) return;
			console.log(data);
			if (data.Combo === 0 && data.FullCombo === false) {
				console.log("Missed");
				lock = true;
				testInc();
			} else lock = false;
		});
	}

	let readyState = -1;
</script>

<title>MicroBlock | BS-DGLab-Connect</title>

<div class="container">
	<TextBlock variant="title">BS-DGLab-Connect</TextBlock>

	<TextBlock variant="subtitle">操作</TextBlock>
	<div>
		<Button on:click={connectDGLab}>连接郊狼</Button>

		{#if readyState === 1}
			<Button
				on:click={() => {
					readyState = 0;
					datapuller.close();
				}}>断开BeatSaber</Button
			>
		{:else if readyState === 0}
			<ProgressRing />
		{:else}
			<Button on:click={connectToDataPuller}>连接BeatSaber</Button>
		{/if}
	</div>

	<TextBlock variant="subtitle">设置</TextBlock>
	<div>
		<div style="display: flex;">
			<span style="min-width: 2em; padding:0 1em;">强度</span>

			<Slider bind:value={strength} min={10} max={160} />
		</div>
	</div>

	<TextBlock variant="subtitle">测试</TextBlock>
	<div>
		<Button on:click={connectDGLab}>测试连接</Button>
		<Button on:click={testInc}>测试来电</Button>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		padding: 10vh min(20%, 10em);

		.task {
			margin-top: 0.2em;
			.text {
				white-space: pre-line;
			}
		}
	}
</style>
