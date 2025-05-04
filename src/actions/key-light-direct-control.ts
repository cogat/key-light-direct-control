import { action, KeyDownEvent, SingletonAction, WillAppearEvent, streamDeck } from "@elgato/streamdeck";
export class KeyLightToggle extends SingletonAction<KeyLightSettings> {

	override onWillAppear(ev: WillAppearEvent<KeyLightSettings>): void | Promise<void> {
		// return ev.action.setTitle(`${ev.payload.settings.count ?? 0}`);
	}


	override async onKeyDown(ev: KeyDownEvent<KeyLightSettings>): Promise<void> {
		const { settings } = ev.payload;
		settings.isOn = !settings.isOn;

		await ev.action.setSettings(settings);
		await ev.action.setTitle(`${settings.isOn ? "ON" : "OFF"}`);
		await this.setKeyLightState(settings);

	}

/**
	 * Set the state of the key light.
	 */
	private async setKeyLightState(settings: KeyLightSettings): Promise<void> {
	try {
		const body = {
			numberOfLights: 1,
			lights: [
				{
					on: settings.isOn ? 1 : 0,
					brightness: settings.brightness || 0,
					temperature: this.getAPITemperature(settings)
				}
			]
		};

		const response = await fetch(`http://${settings.ipAddress}:9123/elgato/lights`, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json'
			},
			body: JSON.stringify(body)
		});

		if (!response.ok) {
			throw new Error(`Failed to set key light state: ${response.statusText}`);
		}
	} catch (error) {
		console.error("Error setting key light state:", error);
		throw error;
	}
}

private getAPITemperature(settings: KeyLightSettings): number {
	if (!settings.kelvinTemperature) return 0;
	return Math.round(settings.kelvinTemperature * 0.05);
}

}

type KeyLightSettings = {
	ipAddress?: string;
	brightness?: number;
	kelvinTemperature?: number;
	isOn?: boolean;
};
