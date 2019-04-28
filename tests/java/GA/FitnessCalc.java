package GA;

public class FitnessCalc {
    static int defaultGeneLength = 150;
    static char[] solution = new char[defaultGeneLength];
    static boolean wantPalindrome = false;      // this is false by default

    public static void setSolution(char[] newSolution) {
    	for (int i = 0; i < 64; i++) {
    		if (i < newSolution.length) {
        		solution[i] = newSolution[i];
    		}
    		else {
    			solution[i] = ' ';
    		}
    	}
    }

    /**
     * This will set our options of our Solution to be palindromic
     * @param setOptionTruePalindromic
     */
    public static void setSolution(boolean setOptionTruePalindromic) {
        wantPalindrome = setOptionTruePalindromic;
    }

    static void setSolution(String newSolution) {
    	setSolution(newSolution.toCharArray());
    }

    // Calculate inidividuals fittness by comparing it to our candidate solution
    static int getFitness(Individual individual) {
        int fitness = 0;
        if (wantPalindrome){
            for (int i = 0; i < individual.size(); i++) {
                if (individual.getGene(i) != individual.getGene(defaultGeneLength-1-i)) fitness -= 1;
            }
        }
        else {
            for (int i = 0; i < individual.size(); i++) {
                // Loop through our individuals genes and compare them to our cadidates
                fitness -= Math.abs(individual.getGene(i) - solution[i]);
            }
        }
        return fitness;
    }
    
    // Get optimum fitness
    static int getMaxFitness() {
        return 0;
    }
}
