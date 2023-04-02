package com.cubingninja;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.worldcubeassociation.tnoodle.scrambles.InvalidScrambleException;
import org.worldcubeassociation.tnoodle.scrambles.Puzzle;
import org.worldcubeassociation.tnoodle.scrambles.PuzzleRegistry;
import org.worldcubeassociation.tnoodle.svglite.Dimension;
import org.worldcubeassociation.tnoodle.svglite.Svg;

import java.util.Base64;

class Scramble {
	public String scrambleText;
	public String scrambleImage;

	public Scramble(String scrambleText, String scrambleImage) {
		this.scrambleText = scrambleText;
		this.scrambleImage = scrambleImage;
	}

	@Override
	public String toString() {
		return String.format("{\"scrambleText\": \"%s\", \"scrambleImage\": \"%s\"}", scrambleText, scrambleImage);
	}
}

public class ScrambleModule extends ReactContextBaseJavaModule {
	ScrambleModule(ReactApplicationContext context) {
		super(context);
	}

	@NonNull
	@Override
	public String getName() {
		return "Scramble";
	}

	@ReactMethod
	public void getScramble(final String puzzle, final Promise promise) {
		PuzzleRegistry wcaModel = getPuzzle(puzzle);
		Puzzle scrambler = wcaModel.getScrambler();
		String scramble = scrambler.generateScramble();
		Svg image = new Svg(new Dimension(0, 0));

		try {
			image = scrambler.drawScramble(scramble, scrambler.getDefaultColorScheme());
		} catch (InvalidScrambleException e) {
			Log.e("getScrambleImage", "Caught Exception: ", e);
			promise.resolve(new InvalidScrambleException("Invalid Scramble"));
		}

		promise.resolve(new Scramble(getEncodedString(scramble), getEncodedString(image.toString())).toString());
	}

	@ReactMethod
	public void getScrambleImage(final String puzzle, final String scramble, final Promise promise) {
		PuzzleRegistry wcaModel = getPuzzle(puzzle);
		Puzzle scrambler = wcaModel.getScrambler();
		Svg image = new Svg(new Dimension(0, 0));

		try {
			image = scrambler.drawScramble(scramble, scrambler.getDefaultColorScheme());
		} catch (InvalidScrambleException e) {
			Log.e("getScrambleImage", "Caught Exception: ", e);
			promise.resolve(new InvalidScrambleException("Invalid Scramble"));
		}

		promise.resolve(getEncodedString(image.toString()));
	}

	private String getEncodedString(String plain) {
		return Base64.getEncoder().encodeToString(plain.getBytes());
	}

	private PuzzleRegistry getPuzzle(String puzzle) {
		PuzzleRegistry wcaModel;

		switch (puzzle) {
			case "2x2":
				wcaModel = PuzzleRegistry.TWO;
				break;
			case "4x4":
				wcaModel = PuzzleRegistry.FOUR;
				break;
			case "5x5":
				wcaModel = PuzzleRegistry.FIVE;
				break;
			case "6x6":
				wcaModel = PuzzleRegistry.SIX;
				break;
			case "7x7":
				wcaModel = PuzzleRegistry.SEVEN;
				break;
			case "Skewb":
				wcaModel = PuzzleRegistry.SKEWB;
				break;
			case "Megaminx":
				wcaModel = PuzzleRegistry.MEGA;
				break;
			case "Pyraminx":
				wcaModel = PuzzleRegistry.PYRA;
				break;
			case "Square-1":
				wcaModel = PuzzleRegistry.SQ1;
				break;
			case "Clock":
				wcaModel = PuzzleRegistry.CLOCK;
				break;
			default:
				wcaModel = PuzzleRegistry.THREE;
		}

		return wcaModel;
	}
}
